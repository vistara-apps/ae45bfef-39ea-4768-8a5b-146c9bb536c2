'use client';

import { MapPin, Camera, TrendingUp, FileText, Award, Share2 } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'GPS-Verified Checkpoints',
    description: 'Scan QR/NFC tags with automatic GPS verification (±20m tolerance). Immutable proof stored on Base L2.',
    color: 'text-primary',
  },
  {
    icon: Camera,
    title: 'Instant Incident Reports',
    description: 'Capture geo-tagged photos with AI-generated summaries. Turn 15-minute reports into 30-second snaps.',
    color: 'text-success',
  },
  {
    icon: TrendingUp,
    title: 'Route Heatmap Dashboard',
    description: 'Visual analytics showing time spent per checkpoint. AI suggests optimizations to cut patrol time by 20%.',
    color: 'text-warning',
  },
  {
    icon: FileText,
    title: 'Automated Client Reports',
    description: 'Zero-touch branded PDF summaries emailed after every shift. Includes patrol score and incident logs.',
    color: 'text-accent',
  },
  {
    icon: Award,
    title: 'Guard Reputation Tokens',
    description: 'Earn on-chain GRT tokens for verified checkpoints. Build a portable career portfolio that attracts better jobs.',
    color: 'text-warning',
  },
  {
    icon: Share2,
    title: 'Farcaster Social Frames',
    description: 'Share shift summaries as interactive frames. Clients react with /verified to boost your reputation.',
    color: 'text-primary',
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need for <span className="text-gradient">Verifiable Patrols</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Built for security guards, managers, and property owners who demand accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-6 hover:bg-surface-hover transition-all duration-200 group"
            >
              <div className={`w-12 h-12 rounded-lg bg-surface-hover flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-text-muted leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
