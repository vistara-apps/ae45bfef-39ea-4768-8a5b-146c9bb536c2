'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface QRScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export function QRScanner({ onScan, onClose, isOpen }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string>('');
  const [scanning, setScanning] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    try {
      setError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
        setScanning(true);
        scanQRCode();
      }
    } catch (err) {
      setError('Camera access denied or not available');
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setScanning(false);
  };

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current || !scanning) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas size to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data for QR code detection
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Simple QR code detection (in a real app, you'd use a library like jsQR)
    // For now, we'll simulate detection
    detectQRCode(imageData).then((result) => {
      if (result) {
        onScan(result);
        stopCamera();
      } else if (scanning) {
        // Continue scanning
        requestAnimationFrame(scanQRCode);
      }
    });
  };

  // Mock QR code detection - in production, use jsQR or similar library
  const detectQRCode = async (imageData: ImageData): Promise<string | null> => {
    // Simulate random detection for demo purposes
    // In production, implement actual QR code scanning
    return new Promise((resolve) => {
      setTimeout(() => {
        // Random chance of detecting a QR code
        if (Math.random() < 0.05) { // 5% chance per frame
          resolve('checkpoint_' + Math.random().toString(36).substr(2, 9));
        } else {
          resolve(null);
        }
      }, 100);
    });
  };

  const handleManualInput = () => {
    const code = prompt('Enter QR code manually:');
    if (code) {
      onScan(code);
      stopCamera();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-fg flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Scan QR Code
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-fg rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error ? (
          <div className="text-center py-8">
            <AlertCircle className="w-16 h-16 text-danger mx-auto mb-4" />
            <p className="text-danger mb-4">{error}</p>
            <div className="space-y-2">
              <button
                onClick={handleManualInput}
                className="btn-secondary w-full"
              >
                Enter Code Manually
              </button>
              <button
                onClick={onClose}
                className="btn-primary w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="relative aspect-square bg-bg rounded-lg overflow-hidden mb-4">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                muted
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* Scanning overlay */}
              <div className="absolute inset-0 border-2 border-primary rounded-lg">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-32 h-32 border-2 border-primary rounded-lg relative">
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-text-muted text-center mb-4">
              Position QR code within the frame to scan
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleManualInput}
                className="btn-secondary flex-1"
              >
                Manual Entry
              </button>
              <button
                onClick={onClose}
                className="btn-primary flex-1"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

