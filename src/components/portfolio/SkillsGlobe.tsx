import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

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
            color="#2962FF"
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

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.002;
  });

  const skills = [
    { name: "React", position: [2, 1, 0] as [number, number, number], color: "#61DAFB" },
    { name: "Node.js", position: [-2, 1, 0] as [number, number, number], color: "#68A063" },
    { name: "TypeScript", position: [0, 2, 1] as [number, number, number], color: "#3178C6" },
    { name: "MongoDB", position: [1, -1, 2] as [number, number, number], color: "#47A248" },
    { name: "Express", position: [-1, -1, -2] as [number, number, number], color: "#000000" },
    { name: "Tailwind", position: [2, -1, -1] as [number, number, number], color: "#06B6D4" },
  ];

  return (
    <group ref={groupRef}>
      <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#2962FF" 
          transparent 
          opacity={0.1} 
          wireframe 
        />
      </Sphere>
      
      <ConnectionLines />
      
      {skills.map((skill, index) => (
        <SkillNode
          key={index}
          position={skill.position}
          skill={skill.name}
          color={skill.color}
        />
      ))}
    </group>
  );
};

export const SkillsGlobe = () => {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden bg-card/50">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} color="#2962FF" intensity={0.8} />
        
        <RotatingGlobe />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};
