import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RingProps {
  radius?: number;
  tube?: number;
  color?: string;
  rotationSpeed?: number;
  position?: [number, number, number];
}

function Ring({ 
  radius = 2, 
  tube = 0.02, 
  color = '#B9B9B9', 
  rotationSpeed = 0.5,
  position = [0, 0, 0]
}: RingProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.rotation.x = time * rotationSpeed * 0.3;
    meshRef.current.rotation.y = time * rotationSpeed * 0.5;
    meshRef.current.rotation.z = time * rotationSpeed * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[radius, tube, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
}

interface RotatingRingsProps {
  className?: string;
}

export function RotatingRings({ className = '' }: RotatingRingsProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <Ring radius={2.5} tube={0.015} color="#B9B9B9" rotationSpeed={0.3} />
        <Ring radius={2} tube={0.02} color="#A7A7AD" rotationSpeed={-0.4} />
        <Ring radius={1.5} tube={0.025} color="#B9B9B9" rotationSpeed={0.5} />
        <Ring radius={1} tube={0.03} color="#F4F4F5" rotationSpeed={-0.6} />
      </Canvas>
    </div>
  );
}
