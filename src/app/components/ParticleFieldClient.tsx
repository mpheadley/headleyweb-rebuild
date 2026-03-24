'use client'

import dynamic from 'next/dynamic'

const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false })

export default function ParticleFieldClient({ className }: { className?: string }) {
  return <ParticleField className={className} />
}
