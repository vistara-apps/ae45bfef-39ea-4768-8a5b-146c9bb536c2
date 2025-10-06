'use client';

import { QrCode, MapPin, Camera, Send } from 'lucide-react';

const steps = [
  {
    icon: QrCode,
    title: 'Scan Checkpoint',
    description: 'Arrive at location and scan QR/NFC tag. GPS automatically verifies your position.',
    step: '01',
  },
  {
    icon: MapPin,
    title: 'Verify Location',
    description: 'App confirms you\'re within 20m of checkpoint. Transaction submitted to Base L2.',
    step: '02',
  },
  {
    icon: Camera,
    title: 'Report Incidents',
    description: 'Spot an issue? Snap a photo. AI generates a summary in seconds.',
    step: '03',
  },
  {
    icon: Send,
    title: 'Auto-Report',
    description: 'Shift complete! Client receives branded PDF summary with patrol score.',
    step: '04',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            How <span className="text-gradient">PatrolProof</span> Works
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            From checkpoint scan to client report in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-border" />
              )}

              <div className="relative z-10 text-center">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface border-2 border-primary mb-4">
                  <span className="text-2xl font-bold text-primary">{step.step}</span>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
