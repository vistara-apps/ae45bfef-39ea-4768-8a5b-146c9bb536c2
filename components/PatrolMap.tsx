'use client';

import { MapPin, Navigation } from 'lucide-react';

export function PatrolMap() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-fg">Active Patrol</h2>
        <button className="btn-secondary flex items-center gap-2">
          <Navigation className="w-4 h-4" />
          <span>Navigate</span>
        </button>
      </div>

      {/* Map Placeholder */}
      <div className="aspect-video bg-bg rounded-lg relative overflow-hidden mb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-text-muted">Map view will display patrol route</p>
            <p className="text-sm text-text-muted mt-2">GPS tracking active</p>
          </div>
        </div>

        {/* Mock Checkpoints */}
        <div className="absolute top-1/4 left-1/4 checkpoint-marker checkpoint-verified">
          1
        </div>
        <div className="absolute top-1/3 right-1/3 checkpoint-marker checkpoint-verified">
          2
        </div>
        <div className="absolute bottom-1/3 left-1/2 checkpoint-marker checkpoint-pending pulse-animation">
          3
        </div>
        <div className="absolute bottom-1/4 right-1/4 checkpoint-marker checkpoint-pending">
          4
        </div>
      </div>

      {/* Patrol Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-success">2</div>
          <div className="text-sm text-text-muted">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">1</div>
          <div className="text-sm text-text-muted">In Progress</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-text-muted">5</div>
          <div className="text-sm text-text-muted">Remaining</div>
        </div>
      </div>
    </div>
  );
}
