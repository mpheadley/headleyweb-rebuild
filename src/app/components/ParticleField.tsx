'use client'

import { useRef, useMemo, useCallback, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ── Config ─────────────────────────────────────────────── */
const PARTICLE_COUNT = 600
const SPREAD = 12          // XY spread
const DEPTH = 8            // Z spread
const DRIFT_SPEED = 0.015  // base drift speed
const MOUSE_INFLUENCE = 1.2

/* ── Colors from Sage & Stone palette ──────────────────── */
const COLORS = [
  new THREE.Color('#6B8F71'), // sage / secondary
  new THREE.Color('#E07B3C'), // terracotta / primary
  new THREE.Color('#F5F0EB'), // light
  new THREE.Color('#6B8F71'), // sage again (weighted)
  new THREE.Color('#FFFFFF'), // white
]

/* ── Particle system (runs inside Canvas) ──────────────── */
function Particles({ mouse }: { mouse: React.RefObject<{ x: number; y: number } | null> }) {
  const mesh = useRef<THREE.Points>(null)

  const { positions, colors, velocities, sizes } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const col = new Float32Array(PARTICLE_COUNT * 3)
    const vel = new Float32Array(PARTICLE_COUNT * 3)
    const siz = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      pos[i3]     = (Math.random() - 0.5) * SPREAD
      pos[i3 + 1] = (Math.random() - 0.5) * SPREAD
      pos[i3 + 2] = (Math.random() - 0.5) * DEPTH

      // random drift direction per particle
      vel[i3]     = (Math.random() - 0.5) * DRIFT_SPEED
      vel[i3 + 1] = (Math.random() - 0.5) * DRIFT_SPEED
      vel[i3 + 2] = (Math.random() - 0.5) * DRIFT_SPEED * 0.3

      // pick a color
      const c = COLORS[Math.floor(Math.random() * COLORS.length)]
      col[i3]     = c.r
      col[i3 + 1] = c.g
      col[i3 + 2] = c.b

      // varied sizes — mostly small, a few larger
      siz[i] = Math.random() < 0.1 ? 3 + Math.random() * 2 : 1 + Math.random() * 1.5
    }

    return { positions: pos, colors: col, velocities: vel, sizes: siz }
  }, [])

  useFrame((_, delta) => {
    if (!mesh.current) return
    const geo = mesh.current.geometry
    const posAttr = geo.attributes.position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array

    const mx = mouse.current?.x ?? 0
    const my = mouse.current?.y ?? 0

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3

      // drift
      arr[i3]     += velocities[i3] * delta * 60
      arr[i3 + 1] += velocities[i3 + 1] * delta * 60
      arr[i3 + 2] += velocities[i3 + 2] * delta * 60

      // gentle mouse repulsion
      const dx = arr[i3] - mx * SPREAD * 0.5
      const dy = arr[i3 + 1] - my * SPREAD * 0.5
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.1
      if (dist < 3) {
        const force = (1 - dist / 3) * MOUSE_INFLUENCE * delta
        arr[i3]     += (dx / dist) * force
        arr[i3 + 1] += (dy / dist) * force
      }

      // wrap around edges
      const halfSpread = SPREAD * 0.5
      const halfDepth = DEPTH * 0.5
      if (arr[i3] > halfSpread) arr[i3] = -halfSpread
      if (arr[i3] < -halfSpread) arr[i3] = halfSpread
      if (arr[i3 + 1] > halfSpread) arr[i3 + 1] = -halfSpread
      if (arr[i3 + 1] < -halfSpread) arr[i3 + 1] = halfSpread
      if (arr[i3 + 2] > halfDepth) arr[i3 + 2] = -halfDepth
      if (arr[i3 + 2] < -halfDepth) arr[i3 + 2] = halfDepth
    }

    posAttr.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={2.5}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ── Wrapper component ─────────────────────────────────── */
export default function ParticleField({ className = '' }: { className?: string }) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (reducedMotion) return null

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouse.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }, [])

  return (
    <div
      className={className}
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Particles mouse={mouse} />
      </Canvas>
    </div>
  )
}
