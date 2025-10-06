'use client';

import { CheckCircle2, Circle, Clock, MapPin } from 'lucide-react';
import { PatrolWithRelations } from '@/lib/types';

interface CheckpointListProps {
  patrol: PatrolWithRelations | null;
  onCheckpointSelect: (checkpointId: string) => void;
}

export function CheckpointList({ patrol, onCheckpointSelect }: CheckpointListProps) {
  if (!patrol) {
    return (
      <div className="glass-card p-8 text-center">
        <MapPin className="w-12 h-12 text-text-muted mx-auto mb-4" />
        <p className="text-text-muted">No active patrol found</p>
        <p className="text-sm text-text-muted mt-2">Start a new patrol to see checkpoints</p>
      </div>
    );
  }

  const scannedCheckpointIds = new Set(
    patrol.checkpointScans.filter(scan => scan.verified).map(scan => scan.checkpointID)
  );

  const checkpointsCompleted = scannedCheckpointIds.size;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Checkpoints</h2>
        <div className="text-sm text-text-muted">
          {checkpointsCompleted} of {patrol.checkpointsRequired} completed
        </div>
      </div>

      <div className="space-y-3">
        {patrol.property.checkpoints.map((checkpoint) => {
          const scan = patrol.checkpointScans.find(s => s.checkpointID === checkpoint.id);
          const isVerified = scan?.verified || false;

          return (
            <div
              key={checkpoint.id}
              className={`glass-card p-4 cursor-pointer transition-all duration-200 hover:bg-surface-hover ${
                isVerified
                  ? 'border-l-4 border-l-success'
                  : 'border-l-4 border-l-border'
              }`}
              onClick={() => onCheckpointSelect(checkpoint.id)}
            >
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div className="flex-shrink-0 mt-1">
                  {isVerified ? (
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  ) : (
                    <Circle className="w-6 h-6 text-text-muted" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{checkpoint.locationName}</h3>
                      <p className="text-sm text-text-muted flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {checkpoint.latitude.toFixed(4)}, {checkpoint.longitude.toFixed(4)}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-medium">
                        {scan ? `${scan.distanceFromCheckpoint}m` : 'Not scanned'}
                      </div>
                      {isVerified && scan && (
                        <div className="text-xs text-text-muted flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {new Date(scan.scannedAt).toLocaleTimeString()}
                        </div>
                      )}
                    </div>
                  </div>

                  {isVerified && scan && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-success/20 text-success text-xs font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                      <span className="text-xs text-text-muted">+{scan.grtAwarded} GRT</span>
                    </div>
                  )}

                  {!isVerified && (
                    <button className="mt-3 btn-primary text-sm py-2">
                      Navigate to Checkpoint
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
