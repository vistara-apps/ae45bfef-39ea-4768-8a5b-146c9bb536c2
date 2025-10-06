'use client';

import { ArrowLeft, Play } from 'lucide-react';
import Link from 'next/link';

export function DemoView() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-fg mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold text-fg mb-4">PatrolProof Demo</h1>
          <p className="text-text-muted mb-8">
            See how PatrolProof transforms security operations with GPS-verified checkpoints and on-chain reputation.
          </p>

          <div className="aspect-video bg-bg rounded-lg flex items-center justify-center mb-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-10 h-10 text-white" />
              </div>
              <p className="text-text-muted">Demo video coming soon</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DemoFeature
              title="GPS-Verified Scanning"
              description="Watch how guards scan checkpoints with automatic location verification"
            />
            <DemoFeature
              title="Instant Incident Reports"
              description="See AI-powered photo analysis generate reports in 30 seconds"
            />
            <DemoFeature
              title="Route Optimization"
              description="Explore heatmaps and AI suggestions for efficient patrols"
            />
            <DemoFeature
              title="Reputation System"
              description="Learn how guards earn GRT tokens and build on-chain reputation"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoFeature({ title, description }: { title: string; description: string }) {
  return (
    <div className="glass-card p-6 hover:bg-surface-hover transition-all duration-200">
      <h3 className="text-lg font-semibold text-fg mb-2">{title}</h3>
      <p className="text-text-muted text-sm">{description}</p>
    </div>
  );
}
