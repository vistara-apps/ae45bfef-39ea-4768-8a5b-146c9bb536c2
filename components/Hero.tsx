'use client';

import { Shield, MapPin, Camera, Award } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg via-surface to-bg">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(hsl(215, 25%, 20%) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(215, 25%, 20%) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-dialog">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-gradient">PatrolProof</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-text-muted mb-8 max-w-3xl mx-auto">
            Verifiable guard tours that build trust, one checkpoint at a time.
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
            GPS-verified checkpoints, instant incident reporting, and on-chain reputation—turning accountability into a social, blockchain-powered game.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/dashboard" className="btn-primary">
              Start Patrol
            </Link>
            <Link href="/demo" className="btn-secondary">
              View Demo
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">GPS Verified</span>
            </div>
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <Camera className="w-5 h-5 text-success" />
              <span className="text-sm font-medium">AI Reports</span>
            </div>
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-warning" />
              <span className="text-sm font-medium">On-Chain Rep</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
    </section>
  );
}
