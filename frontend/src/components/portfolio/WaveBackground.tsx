import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const AnimatedWave = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
    const position = geometry.attributes.position;
    
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const wave1 = Math.sin(x * 0.5 + state.clock.getElapsedTime() * 0.5) * 0.3;
      const wave2 = Math.sin(y * 0.3 + state.clock.getElapsedTime() * 0.3) * 0.2;
      position.setZ(i, wave1 + wave2);
    }
    
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20, 50, 50]} />
      <meshStandardMaterial
        color="#2962FF"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

export const WaveBackground = () => {
  return (
    <div className="absolute inset-0 opacity-20">
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedWave />
      </Canvas>
    </div>
  );
};
