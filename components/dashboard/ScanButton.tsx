'use client';

import { QrCode, Camera } from 'lucide-react';
import { useState } from 'react';
import { getCurrentPosition } from '@/lib/utils/gps';

interface ScanButtonProps {
  patrolId?: string;
  checkpointId?: string;
  onScanSuccess?: () => void;
}

export function ScanButton({ patrolId, checkpointId, onScanSuccess }: ScanButtonProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanMode, setScanMode] = useState<'checkpoint' | 'incident'>('checkpoint');

  const handleCheckpointScan = async () => {
    if (!patrolId || !checkpointId) {
      alert('No active patrol or checkpoint selected');
      return;
    }

    setIsScanning(true);
    try {
      // Get GPS location
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;

      // Call API to scan checkpoint
      const response = await fetch(`/api/checkpoints/${checkpointId}/scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patrolID: patrolId,
          gpsLat: latitude,
          gpsLong: longitude,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.gpsVerification.verified) {
          alert(`✅ Checkpoint verified! +${result.grtAwarded} GRT earned`);
        } else {
          alert(`❌ GPS verification failed. Distance: ${result.gpsVerification.distance}m (max: ${result.gpsVerification.tolerance}m)`);
        }
        onScanSuccess?.();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Scan error:', error);
      alert('Failed to scan checkpoint. Please check GPS permissions.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleIncidentReport = () => {
    // This would open camera for incident reporting
    setScanMode('incident');
    // Implementation would continue with camera access
    alert('Incident reporting feature - camera access needed');
  };

  if (scanMode === 'incident') {
    return (
      <div className="fixed bottom-20 right-6 flex gap-2">
        <button
          onClick={() => setScanMode('checkpoint')}
          className="fab bg-surface hover:bg-surface-hover border border-border"
        >
          <QrCode className="w-6 h-6" />
        </button>
        <button
          onClick={handleIncidentReport}
          className="fab fab-danger"
        >
          <Camera className="w-8 h-8" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-6 flex gap-2">
      <button
        onClick={() => setScanMode('incident')}
        className="fab bg-surface hover:bg-surface-hover border border-border"
      >
        <Camera className="w-6 h-6" />
      </button>
      <button
        onClick={handleCheckpointScan}
        disabled={isScanning || !patrolId}
        className="fab fab-primary"
      >
        <QrCode className={`w-8 h-8 ${isScanning ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
}
