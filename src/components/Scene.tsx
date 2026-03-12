import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Globe from './Globe';

const Scene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        {/* Lighting setup for the dark theme */}
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 10, 5]} intensity={1} color="#A855F7" />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#3B82F6" />
        <pointLight position={[0, -5, 5]} intensity={0.5} color="#10B981" />

        <Suspense fallback={null}>
          <Globe />
          {/* Environment maps for reflections */}
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate={false} 
        />
      </Canvas>
    </div>
  );
};

export default Scene;
