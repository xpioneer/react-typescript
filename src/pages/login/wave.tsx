import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Wave = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);

  // Wave parameters
  const waveParams = {
    amplitude: 2,
    wavelength: 10,
    frequency: 0.2
  };

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const geometry = geometryRef.current!;
    const positionAttribute = geometry.attributes.position;
    
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = Math.sin(x * waveParams.frequency + time) * waveParams.amplitude
              + Math.cos(y * waveParams.frequency + time) * waveParams.amplitude;
      positionAttribute.setZ(i, z);
    }

    positionAttribute.needsUpdate = true; // Notify Three.js that the vertices have changed
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry ref={geometryRef} args={[800, 800, 500, 500]} />
      <meshPhongMaterial color={0x087ea4ee} wireframe />
    </mesh>
  );
};

export const WaveComponent: React.FC = () => {
  return <Canvas
    gl={{
      antialias: true,
      alpha: true,
    }}
    style={{
      backgroundColor: 'rgba(8, 126, 164, 0.06)',
      width: '100%',
      height: '100%',
    }}
    camera={{ position: [-50, 50, 100], near: 0.1, far: 1000 }}
  >
    <ambientLight intensity={0.5} />
    <directionalLight position={[50, 100, 75]} intensity={1} />
    <Wave />
  </Canvas>
}