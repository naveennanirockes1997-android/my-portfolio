import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const RotatingCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
  });

  return (
    <RoundedBox ref={meshRef} args={[2, 2, 2]} radius={0.1} smoothness={4}>
      <MeshDistortMaterial
        color="#2962FF"
        attach="material"
        distort={0.4}
        speed={3}
        roughness={0.1}
        metalness={0.9}
      />
    </RoundedBox>
  );
};

export const AnimatedCube = () => {
  return (
    <div className="w-full h-64 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} color="#00D9FF" intensity={0.5} />
        
        <RotatingCube />
      </Canvas>
    </div>
  );
};
