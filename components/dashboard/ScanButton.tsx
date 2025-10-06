'use client';

import { QrCode } from 'lucide-react';
import { useState } from 'react';

export function ScanButton() {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scan
    setTimeout(() => {
      setIsScanning(false);
      alert('Checkpoint scanned! +1 GRT earned');
    }, 2000);
  };

  return (
    <button
      onClick={handleScan}
      disabled={isScanning}
      className="fab fab-primary"
    >
      <QrCode className={`w-8 h-8 ${isScanning ? 'animate-spin' : ''}`} />
    </button>
  );
}
