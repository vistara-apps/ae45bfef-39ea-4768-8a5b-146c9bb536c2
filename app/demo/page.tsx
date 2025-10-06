'use client';

import Link from 'next/link';
import { ArrowLeft, Play } from 'lucide-react';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-fg mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            See <span className="text-gradient">PatrolProof</span> in Action
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Watch how security guards use PatrolProof to verify patrols and build on-chain reputation.
          </p>
        </div>

        {/* Demo Video Placeholder */}
        <div className="glass-card p-8 max-w-4xl mx-auto">
          <div className="aspect-video bg-surface rounded-lg flex items-center justify-center">
            <button className="w-20 h-20 rounded-full bg-primary hover:bg-primary-hover flex items-center justify-center transition-colors duration-200 shadow-dialog">
              <Play className="w-10 h-10 text-white ml-1" />
            </button>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2 sec</div>
              <p className="text-sm text-text-muted">Average scan time</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">90%</div>
              <p className="text-sm text-text-muted">Dispute reduction</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning mb-2">20%</div>
              <p className="text-sm text-text-muted">Time saved per shift</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2">
            Try It Yourself
          </Link>
        </div>
      </div>
    </div>
  );
}
