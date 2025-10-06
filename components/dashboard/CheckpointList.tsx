'use client';

import { CheckCircle2, Circle, Clock, MapPin } from 'lucide-react';

const checkpoints = [
  {
    id: 1,
    name: 'North Gate',
    location: 'Building A Entrance',
    status: 'verified',
    time: '10:15 PM',
    distance: '0m',
  },
  {
    id: 2,
    name: 'East Entrance',
    location: 'Parking Lot B',
    status: 'verified',
    time: '10:32 PM',
    distance: '0m',
  },
  {
    id: 3,
    name: 'South Parking',
    location: 'Visitor Parking',
    status: 'pending',
    time: 'Not scanned',
    distance: '120m',
  },
  {
    id: 4,
    name: 'West Building',
    location: 'Loading Dock',
    status: 'pending',
    time: 'Not scanned',
    distance: '250m',
  },
];

export function CheckpointList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Checkpoints</h2>
        <div className="text-sm text-text-muted">
          2 of 4 completed
        </div>
      </div>

      <div className="space-y-3">
        {checkpoints.map((checkpoint) => (
          <div
            key={checkpoint.id}
            className={`glass-card p-4 ${
              checkpoint.status === 'verified'
                ? 'border-l-4 border-l-success'
                : 'border-l-4 border-l-border'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Status Icon */}
              <div className="flex-shrink-0 mt-1">
                {checkpoint.status === 'verified' ? (
                  <CheckCircle2 className="w-6 h-6 text-success" />
                ) : (
                  <Circle className="w-6 h-6 text-text-muted" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">{checkpoint.name}</h3>
                    <p className="text-sm text-text-muted flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {checkpoint.location}
                    </p>
                  </div>
                  
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-medium">
                      {checkpoint.distance}
                    </div>
                    {checkpoint.status === 'verified' && (
                      <div className="text-xs text-text-muted flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {checkpoint.time}
                      </div>
                    )}
                  </div>
                </div>

                {checkpoint.status === 'verified' && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-success/20 text-success text-xs font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                    <span className="text-xs text-text-muted">+1 GRT</span>
                  </div>
                )}

                {checkpoint.status === 'pending' && (
                  <button className="mt-3 btn-primary text-sm py-2">
                    Navigate to Checkpoint
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
