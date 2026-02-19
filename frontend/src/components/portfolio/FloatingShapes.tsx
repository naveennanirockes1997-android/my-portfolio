import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useInView } from "framer-motion";
import * as THREE from "three";

const AnimatedShape = ({ position, color, shape }: { position: [number, number, number]; color: string; shape: "sphere" | "box" | "torus" }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {shape === "sphere" && <sphereGeometry args={[1, 32, 32]} />}
        {shape === "box" && <boxGeometry args={[1.5, 1.5, 1.5]} />}
        {shape === "torus" && <torusGeometry args={[1, 0.4, 16, 100]} />}
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#2962FF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export const FloatingShapes = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "100px" });

  return (
    <div ref={containerRef} className="absolute inset-0 opacity-40">
      {isInView && (
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 50 }}
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
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8B5CF6" />
          
          <AnimatedShape position={[-3, 2, 0]} color="#8B5CF6" shape="sphere" />
          <AnimatedShape position={[3, -2, -2]} color="#6366F1" shape="box" />
          <AnimatedShape position={[0, 0, -3]} color="#EC4899" shape="torus" />
          
          <ParticleField />
        </Canvas>
      )}
    </div>
  );
};
