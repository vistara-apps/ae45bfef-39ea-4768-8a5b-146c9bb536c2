'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { PatrolMap } from '@/components/dashboard/PatrolMap';
import { CheckpointList } from '@/components/dashboard/CheckpointList';
import { MetricsOverview } from '@/components/dashboard/MetricsOverview';
import { BottomNav } from '@/components/dashboard/BottomNav';
import { ScanButton } from '@/components/dashboard/ScanButton';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'map' | 'checkpoints' | 'metrics'>('map');

  return (
    <div className="min-h-screen bg-bg pb-20">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'map' && <PatrolMap />}
        {activeTab === 'checkpoints' && <CheckpointList />}
        {activeTab === 'metrics' && <MetricsOverview />}
      </main>

      <ScanButton />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
