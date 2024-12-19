import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAppStore } from '@/stores'

const Wave = ({ color }: { color: THREE.Color }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometryRef = useRef<THREE.PlaneGeometry>(null)

  // Wave parameters
  const waveParams = {
    amplitude: 2,
    wavelength: 10,
    frequency: 0.2,
  }

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    const geometry = geometryRef.current!
    const positionAttribute = geometry.attributes.position

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i)
      const y = positionAttribute.getY(i)
      const z =
        Math.sin(x * waveParams.frequency + time) * waveParams.amplitude +
        Math.cos(y * waveParams.frequency + time) * waveParams.amplitude
      positionAttribute.setZ(i, z)
    }

    positionAttribute.needsUpdate = true // Notify Three.js that the vertices have changed
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 4, 0, 0]}>
      <planeGeometry ref={geometryRef} args={[800, 800, 500, 500]} />
      <meshPhongMaterial color={color} wireframe />
    </mesh>
  )
}

export const WaveComponent: React.FC = () => {
  const [{ colorPrimary }] = useAppStore()

  const color = new THREE.Color(colorPrimary)
  const rgb = [color.r, color.g, color.b].map((i) => Math.round(i * 255))

  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
      }}
      style={{
        backgroundColor: `rgba(${rgb.join()}, 0.05)`,
        width: '100%',
        height: '100%',
      }}
      camera={{ position: [0, 0, 60], near: 0.1, far: 1000 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[-100, -100, 1000]} intensity={1} />
      <Wave color={color} />
    </Canvas>
  )
}
