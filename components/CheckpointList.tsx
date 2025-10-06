'use client';

import { CheckCircle2, Circle } from 'lucide-react';
import { CheckpointScanner } from './CheckpointScanner';

interface Checkpoint {
  id: string;
  name: string;
  status: 'completed' | 'pending' | 'current';
  time?: string;
  grt?: number;
}

const mockCheckpoints: Checkpoint[] = [
  { id: '1', name: 'North Gate', status: 'completed', time: '10:15 PM', grt: 1 },
  { id: '2', name: 'East Parking', status: 'completed', time: '10:28 PM', grt: 1 },
  { id: '3', name: 'Main Lobby', status: 'current' },
  { id: '4', name: 'West Wing', status: 'pending' },
  { id: '5', name: 'South Exit', status: 'pending' },
  { id: '6', name: 'Roof Access', status: 'pending' },
  { id: '7', name: 'Basement', status: 'pending' },
  { id: '8', name: 'Back Gate', status: 'pending' },
];

export function CheckpointList() {
  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold text-fg mb-6">Checkpoints</h2>
      
      <div className="space-y-3">
        {mockCheckpoints.map((checkpoint) => (
          <CheckpointCard key={checkpoint.id} checkpoint={checkpoint} />
        ))}
      </div>
    </div>
  );
}

function CheckpointCard({ checkpoint }: { checkpoint: Checkpoint }) {
  const getStatusIcon = () => {
    if (checkpoint.status === 'completed') {
      return <CheckCircle2 className="w-5 h-5 text-success" />;
    }
    if (checkpoint.status === 'current') {
      return <Circle className="w-5 h-5 text-primary pulse-animation" />;
    }
    return <Circle className="w-5 h-5 text-text-muted" />;
  };

  const getStatusStyle = () => {
    if (checkpoint.status === 'completed') {
      return 'border-success/30 bg-success/5';
    }
    if (checkpoint.status === 'current') {
      return 'border-primary bg-primary/10';
    }
    return 'border-border';
  };

  return (
    <div className={`glass-card p-4 border ${getStatusStyle()} transition-all duration-200`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <div className="font-medium text-fg">{checkpoint.name}</div>
            {checkpoint.time && (
              <div className="text-sm text-text-muted">{checkpoint.time}</div>
            )}
          </div>
        </div>

        {checkpoint.grt && (
          <div className="flex items-center gap-1 bg-primary/20 text-primary px-2 py-1 rounded-full text-sm font-medium">
            +{checkpoint.grt} GRT
          </div>
        )}
      </div>

      {checkpoint.status === 'current' && (
        <CheckpointScanner
          checkpoint={{
            id: checkpoint.id,
            locationName: checkpoint.name,
            latitude: 40.7128, // Mock coordinates - in real app, fetch from API
            longitude: -74.0060,
            qrCodeHash: `checkpoint_${checkpoint.id}`,
          }}
          onScanComplete={(verification) => {
            console.log('Checkpoint scanned:', verification);
            // Handle scan completion - update state, call API, etc.
          }}
        />
      )}
    </div>
  );
}
