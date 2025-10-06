'use client';

import { useState, useEffect } from 'react';
import { MapPin, QrCode, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { QRScanner } from './QRScanner';
import { GeolocationService } from '@/lib/geolocation';
import { Location, CheckpointVerification } from '@/lib/types';

interface Checkpoint {
  id: string;
  locationName: string;
  latitude: number;
  longitude: number;
  qrCodeHash: string;
}

interface CheckpointScannerProps {
  checkpoint: Checkpoint;
  onScanComplete: (verification: CheckpointVerification) => void;
  disabled?: boolean;
}

export function CheckpointScanner({ checkpoint, onScanComplete, disabled }: CheckpointScannerProps) {
  const [showScanner, setShowScanner] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [verification, setVerification] = useState<CheckpointVerification | null>(null);
  const [error, setError] = useState<string>('');

  const getLocation = async () => {
    try {
      setError('');
      const userLocation = await GeolocationService.getCurrentPosition();
      setLocation(userLocation);
      return userLocation;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location');
      return null;
    }
  };

  const handleQRScan = async (qrData: string) => {
    setScanning(true);
    setError('');

    try {
      // Get current location
      const userLocation = await getLocation();
      if (!userLocation) {
        setError('Unable to get your location');
        setScanning(false);
        return;
      }

      // Verify QR code matches checkpoint
      if (qrData !== checkpoint.qrCodeHash && qrData !== `checkpoint_${checkpoint.id}`) {
        setError('QR code does not match this checkpoint');
        setScanning(false);
        return;
      }

      // Verify location
      const verification = await GeolocationService.verifyCheckpointLocation(
        userLocation,
        checkpoint.latitude,
        checkpoint.longitude
      );

      const result: CheckpointVerification = {
        verified: verification.verified,
        distance: verification.distance,
        checkpointId: checkpoint.id,
        location: userLocation,
      };

      setVerification(result);
      onScanComplete(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Scan failed');
    } finally {
      setScanning(false);
      setShowScanner(false);
    }
  };

  const handleScanClick = async () => {
    if (disabled) return;

    setError('');
    setVerification(null);

    // Pre-get location before showing scanner
    const userLocation = await getLocation();
    if (!userLocation) return;

    setShowScanner(true);
  };

  return (
    <>
      <div className="space-y-4">
        <button
          onClick={handleScanClick}
          disabled={disabled || scanning}
          className="scan-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {scanning ? (
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          ) : (
            <QrCode className="w-8 h-8 text-white" />
          )}
        </button>

        {location && (
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-text-muted mb-2">
              <MapPin className="w-4 h-4" />
              <span>Location acquired</span>
            </div>
            {location.accuracy && (
              <div className="text-xs text-text-muted">
                Accuracy: ±{Math.round(location.accuracy)}m
              </div>
            )}
          </div>
        )}

        {verification && (
          <div className={`p-4 rounded-lg border ${
            verification.verified
              ? 'border-success bg-success/5'
              : 'border-danger bg-danger/5'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {verification.verified ? (
                <CheckCircle2 className="w-5 h-5 text-success" />
              ) : (
                <AlertCircle className="w-5 h-5 text-danger" />
              )}
              <span className={`font-medium ${
                verification.verified ? 'text-success' : 'text-danger'
              }`}>
                {verification.verified ? 'Checkpoint Verified!' : 'Verification Failed'}
              </span>
            </div>
            <div className="text-sm text-text-muted">
              Distance: {GeolocationService.formatDistance(verification.distance)}
              {verification.distance > 20 && ' (too far from checkpoint)'}
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg border border-danger bg-danger/5">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-danger" />
              <span className="text-danger text-sm">{error}</span>
            </div>
          </div>
        )}
      </div>

      <QRScanner
        isOpen={showScanner}
        onScan={handleQRScan}
        onClose={() => setShowScanner(false)}
      />
    </>
  );
}

