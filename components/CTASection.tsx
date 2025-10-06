'use client';

import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-12 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
          
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-4xl font-bold mb-4">
              Ready to Build <span className="text-gradient">Trust</span>?
            </h2>
            
            <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
              Join security companies using PatrolProof to turn accountability into competitive advantage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2">
                Start Your First Patrol
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Sales
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 justify-center text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>$0.10 per checkpoint</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>On-chain reputation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <span>Zero setup fees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
