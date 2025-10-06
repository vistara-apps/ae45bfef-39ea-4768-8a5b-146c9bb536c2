'use client';

import { MapPin, Navigation } from 'lucide-react';

const mockCheckpoints = [
  { id: 1, name: 'North Gate', status: 'verified', lat: 37.7749, lng: -122.4194 },
  { id: 2, name: 'East Entrance', status: 'verified', lat: 37.7759, lng: -122.4184 },
  { id: 3, name: 'South Parking', status: 'pending', lat: 37.7739, lng: -122.4204 },
  { id: 4, name: 'West Building', status: 'pending', lat: 37.7749, lng: -122.4214 },
];

export function PatrolMap() {
  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div className="glass-card p-4 h-96 relative overflow-hidden">
        {/* Placeholder map with grid */}
        <div className="absolute inset-0 bg-surface">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(hsl(215, 25%, 20%) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(215, 25%, 20%) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }} />
          </div>

          {/* Mock checkpoint markers */}
          <div className="absolute top-1/4 left-1/4 checkpoint-marker checkpoint-verified">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="absolute top-1/3 right-1/3 checkpoint-marker checkpoint-verified">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 checkpoint-marker checkpoint-pending">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="absolute bottom-1/4 right-1/4 checkpoint-marker checkpoint-pending">
            <MapPin className="w-6 h-6" />
          </div>

          {/* Current location indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
            <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary/30 animate-ping" />
          </div>
        </div>

        {/* Map controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 rounded-lg bg-surface hover:bg-surface-hover flex items-center justify-center shadow-card transition-colors duration-200">
            <Navigation className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>

      {/* Route Info */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-muted">Current Route</p>
            <p className="text-lg font-semibold">Oakwood Plaza - Night Shift</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-text-muted">Progress</p>
            <p className="text-lg font-semibold text-primary">2/4 Checkpoints</p>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 h-2 bg-surface rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-accent w-1/2 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
}
