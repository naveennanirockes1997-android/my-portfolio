import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Sphere, Line } from "@react-three/drei";
import { useInView } from "framer-motion";
import * as THREE from "three";
import { getApiUrl } from "@/utils/api";

interface SkillNodeProps {
  position: [number, number, number];
  skill: string;
  color: string;
}

const SkillNode = ({ position, skill, color }: SkillNodeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="https://cdn.jsdelivr.net/fontsource/fonts/outfit@latest/latin-400-normal.woff"
      >
        {skill}
      </Text>
    </group>
  );
};

const ConnectionLines = () => {
  const positions: [number, number, number][] = [
    [2, 1, 0],
    [-2, 1, 0],
    [0, 2, 1],
    [1, -1, 2],
    [-1, -1, -2],
    [2, -1, -1],
  ];

  return (
    <>
      {positions.map((pos, i) => {
        const nextPos = positions[(i + 1) % positions.length];
        const points = [pos, nextPos];
        
        return (
          <Line
            key={i}
            points={points}
            color="#8B5CF6"
            lineWidth={1}
            transparent
            opacity={0.3}
          />
        );
      })}
    </>
  );
};

const RotatingGlobe = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(getApiUrl('/api/skills'));
        if (response.ok) {
          const data = await response.json();
          setSkills(data);
        }
      } catch (error) {
        console.error("Failed to fetch skills for globe:", error);
      }
    };
    fetchSkills();
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.002;
  });

  const getPosition = (index: number, total: number): [number, number, number] => {
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    const radius = 2.5;

    return [
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi)
    ];
  };

  const defaultSkills = [
    { name: "React", position: [2, 1, 0] as [number, number, number], color: "#61DAFB" },
    { name: "Node.js", position: [-2, 1, 0] as [number, number, number], color: "#68A063" },
    { name: "TypeScript", position: [0, 2, 1] as [number, number, number], color: "#3178C6" },
    { name: "MongoDB", position: [1, -1, 2] as [number, number, number], color: "#47A248" },
    { name: "Express", position: [-1, -1, -2] as [number, number, number], color: "#8B5CF6" },
    { name: "Tailwind", position: [2, -1, -1] as [number, number, number], color: "#06B6D4" },
  ];

  const displaySkills = skills.length > 0 
    ? skills.map((s, i) => ({
        name: s.name,
        position: getPosition(i, skills.length),
        color: i % 2 === 0 ? "#8B5CF6" : "#61DAFB"
      }))
    : defaultSkills;

  return (
    <group ref={groupRef}>
      <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#8B5CF6" 
          transparent 
          opacity={0.1} 
          wireframe 
        />
      </Sphere>
      
      <ConnectionLines />
      
      {displaySkills.map((skill, index) => (
        <SkillNode
          key={index}
          position={skill.position as [number, number, number]}
          skill={skill.name}
          color={skill.color}
        />
      ))}
    </group>
  );
};

export const SkillsGlobe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "100px" });

  return (
    <div ref={containerRef} className="w-full h-[500px] rounded-xl overflow-hidden bg-card/50">
      {isInView && (
        <Canvas 
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={1}
          eventPrefix="client"
          gl={{ 
            antialias: false, 
            alpha: true, 
            powerPreference: "low-power",
            failIfMajorPerformanceCaveat: false,
            stencil: false,
            depth: true
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} color="#8B5CF6" intensity={0.8} />
          
          <RotatingGlobe />
          
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      )}
    </div>
  );
};
