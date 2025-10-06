'use client';

import { Shield, MapPin, Camera, TrendingUp, Award, Users } from 'lucide-react';
import Link from 'next/link';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-fg">PatrolProof</h1>
          </div>

          <h2 className="text-5xl font-bold text-fg mb-6 max-w-3xl">
            Verifiable Guard Tours That Build Trust
          </h2>
          
          <p className="text-xl text-text-muted mb-8 max-w-2xl">
            GPS-verified checkpoints, instant incident reporting, and on-chain reputation—turning accountability into a social, on-chain reputation game.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/dashboard" className="btn-primary text-center">
              Start Patrol
            </Link>
            <Link href="/demo" className="btn-secondary text-center">
              View Demo
            </Link>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<MapPin className="w-6 h-6" />}
              title="GPS-Verified Checkpoints"
              description="Scan QR/NFC tags with location verification. Immutable proof on Base L2."
            />
            <FeatureCard
              icon={<Camera className="w-6 h-6" />}
              title="Instant Incident Reports"
              description="Snap a photo, AI generates summary. 30 seconds vs 15 minutes."
            />
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Route Heatmaps"
              description="Visual analytics showing time per checkpoint. AI-powered optimization."
            />
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Automated Client Reports"
              description="Zero-touch PDF summaries emailed after every shift."
            />
            <FeatureCard
              icon={<Award className="w-6 h-6" />}
              title="Reputation Tokens"
              description="Earn GRT tokens for verified patrols. Build on-chain career portfolio."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Farcaster Integration"
              description="Share shift summaries as Frames. Social proof meets accountability."
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StatCard value="90%" label="Dispute Reduction" />
            <StatCard value="20%" label="Time Saved" />
            <StatCard value="100%" label="Client Trust" />
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h3 className="text-3xl font-bold text-fg mb-12 text-center">How It Works</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <StepCard
            number="1"
            title="Connect Wallet"
            description="Sign in with Base Wallet to start your first patrol"
          />
          <StepCard
            number="2"
            title="Scan Checkpoints"
            description="Use QR/NFC scanning with GPS verification"
          />
          <StepCard
            number="3"
            title="Report Incidents"
            description="Snap photos, AI generates summaries instantly"
          />
          <StepCard
            number="4"
            title="Earn Reputation"
            description="Build on-chain GRT tokens and share on Farcaster"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Security Operations?
          </h3>
          <p className="text-xl text-white/90 mb-8">
            Join guards building verifiable reputation on Base
          </p>
          <Link href="/dashboard" className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-200">
            Start Your First Patrol
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="glass-card p-6 hover:bg-surface-hover transition-all duration-200">
      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 text-primary">
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-fg mb-2">{title}</h4>
      <p className="text-text-muted text-sm">{description}</p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold text-primary mb-2">{value}</div>
      <div className="text-text-muted">{label}</div>
    </div>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
        {number}
      </div>
      <h4 className="text-lg font-semibold text-fg mb-2">{title}</h4>
      <p className="text-text-muted text-sm">{description}</p>
    </div>
  );
}
