'use client';

import { MapPin, Navigation } from 'lucide-react';
import { PatrolWithRelations } from '@/lib/types';

interface PatrolMapProps {
  patrol: PatrolWithRelations | null;
  onCheckpointSelect: (checkpointId: string) => void;
}

export function PatrolMap({ patrol, onCheckpointSelect }: PatrolMapProps) {
  if (!patrol) {
    return (
      <div className="glass-card p-8 text-center">
        <MapPin className="w-12 h-12 text-text-muted mx-auto mb-4" />
        <p className="text-text-muted">No active patrol found</p>
        <p className="text-sm text-text-muted mt-2">Start a new patrol to see the map</p>
      </div>
    );
  }

  const scannedCheckpointIds = new Set(
    patrol.checkpointScans.filter(scan => scan.verified).map(scan => scan.checkpointID)
  );

  const checkpointsCompleted = scannedCheckpointIds.size;
  const progress = patrol.checkpointsRequired > 0 ? (checkpointsCompleted / patrol.checkpointsRequired) * 100 : 0;

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

          {/* Checkpoint markers */}
          {patrol.property.checkpoints.map((checkpoint, index) => {
            const isScanned = scannedCheckpointIds.has(checkpoint.id);
            const position = getCheckpointPosition(index, patrol.property.checkpoints.length);

            return (
              <button
                key={checkpoint.id}
                onClick={() => onCheckpointSelect(checkpoint.id)}
                className={`absolute checkpoint-marker ${
                  isScanned ? 'checkpoint-verified' : 'checkpoint-pending'
                }`}
                style={{
                  top: position.top,
                  left: position.left,
                }}
                title={checkpoint.locationName}
              >
                <MapPin className="w-6 h-6" />
              </button>
            );
          })}

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
            <p className="text-lg font-semibold">{patrol.property.name}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-text-muted">Progress</p>
            <p className="text-lg font-semibold text-primary">
              {checkpointsCompleted}/{patrol.checkpointsRequired} Checkpoints
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// Helper function to position checkpoints on the map
function getCheckpointPosition(index: number, total: number): { top: string; left: string } {
  const positions = [
    { top: '25%', left: '25%' },
    { top: '30%', left: '70%' },
    { top: '65%', left: '30%' },
    { top: '70%', left: '75%' },
    { top: '20%', left: '50%' },
    { top: '80%', left: '20%' },
    { top: '40%', left: '80%' },
    { top: '75%', left: '60%' },
  ];

  return positions[index % positions.length];
}
