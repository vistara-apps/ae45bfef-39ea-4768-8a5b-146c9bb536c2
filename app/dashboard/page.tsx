'use client';

import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { PatrolMap } from '@/components/dashboard/PatrolMap';
import { CheckpointList } from '@/components/dashboard/CheckpointList';
import { MetricsOverview } from '@/components/dashboard/MetricsOverview';
import { BottomNav } from '@/components/dashboard/BottomNav';
import { ScanButton } from '@/components/dashboard/ScanButton';
import { PatrolWithRelations } from '@/lib/types';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'map' | 'checkpoints' | 'metrics'>('map');
  const [activePatrol, setActivePatrol] = useState<PatrolWithRelations | null>(null);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<string | null>(null);

  // Load active patrol on mount
  useEffect(() => {
    const loadActivePatrol = async () => {
      try {
        // This would get the wallet address from MiniKit
        const walletAddress = '0x123...'; // Placeholder

        const response = await fetch(`/api/patrols?guardID=${walletAddress}&status=active`);
        if (response.ok) {
          const patrols = await response.json();
          if (patrols.length > 0) {
            setActivePatrol(patrols[0]);
          }
        }
      } catch (error) {
        console.error('Error loading active patrol:', error);
      }
    };

    loadActivePatrol();
  }, []);

  const handleScanSuccess = () => {
    // Refresh data after successful scan
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-bg pb-20">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'map' && (
          <PatrolMap
            patrol={activePatrol}
            onCheckpointSelect={setSelectedCheckpoint}
          />
        )}
        {activeTab === 'checkpoints' && (
          <CheckpointList
            patrol={activePatrol}
            onCheckpointSelect={setSelectedCheckpoint}
          />
        )}
        {activeTab === 'metrics' && <MetricsOverview patrol={activePatrol} />}
      </main>

      <ScanButton
        patrolId={activePatrol?.id}
        checkpointId={selectedCheckpoint || undefined}
        onScanSuccess={handleScanSuccess}
      />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
