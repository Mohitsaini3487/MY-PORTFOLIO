import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Globe: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random points on a sphere
  const particlesPosition = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.05; // Slightly larger than the sphere radius

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
      
      // Add subtle floating effect
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Mouse interaction for rotation
      const mouseX = (state.pointer.x * Math.PI) / 8;
      const mouseY = (state.pointer.y * Math.PI) / 8;
      
      meshRef.current.rotation.y += (mouseX - meshRef.current.rotation.y) * 0.05;
      meshRef.current.rotation.x += (-mouseY - meshRef.current.rotation.x) * 0.05;
    }
    
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhysicalMaterial
          color="#121212"
          emissive="#000000"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1.0}
        />
      </mesh>
      
      {/* Point cloud surrounding the globe */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#A855F7"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
      
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#A855F7" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

export default Globe;
