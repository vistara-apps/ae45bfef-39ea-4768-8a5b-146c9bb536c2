'use client';

import { useState } from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { MapPin, Camera, TrendingUp, Award, Menu, X } from 'lucide-react';
import { PatrolMap } from './PatrolMap';
import { CheckpointList } from './CheckpointList';
import { IncidentReports } from './IncidentReports';
import { ReputationDashboard } from './ReputationDashboard';

type TabType = 'patrol' | 'incidents' | 'analytics' | 'reputation';

export function DashboardView() {
  const [activeTab, setActiveTab] = useState<TabType>('patrol');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-fg">PatrolProof</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <TabButton
                active={activeTab === 'patrol'}
                onClick={() => setActiveTab('patrol')}
                icon={<MapPin className="w-5 h-5" />}
                label="Patrol"
              />
              <TabButton
                active={activeTab === 'incidents'}
                onClick={() => setActiveTab('incidents')}
                icon={<Camera className="w-5 h-5" />}
                label="Incidents"
              />
              <TabButton
                active={activeTab === 'analytics'}
                onClick={() => setActiveTab('analytics')}
                icon={<TrendingUp className="w-5 h-5" />}
                label="Analytics"
              />
              <TabButton
                active={activeTab === 'reputation'}
                onClick={() => setActiveTab('reputation')}
                icon={<Award className="w-5 h-5" />}
                label="Reputation"
              />
            </nav>

            <div className="flex items-center gap-4">
              <Wallet>
                <ConnectWallet>
                  <Avatar className="w-8 h-8" />
                  <Name className="text-sm font-medium" />
                </ConnectWallet>
              </Wallet>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-fg hover:bg-surface-hover rounded-lg"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {menuOpen && (
            <nav className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-2">
                <MobileTabButton
                  active={activeTab === 'patrol'}
                  onClick={() => {
                    setActiveTab('patrol');
                    setMenuOpen(false);
                  }}
                  icon={<MapPin className="w-5 h-5" />}
                  label="Patrol"
                />
                <MobileTabButton
                  active={activeTab === 'incidents'}
                  onClick={() => {
                    setActiveTab('incidents');
                    setMenuOpen(false);
                  }}
                  icon={<Camera className="w-5 h-5" />}
                  label="Incidents"
                />
                <MobileTabButton
                  active={activeTab === 'analytics'}
                  onClick={() => {
                    setActiveTab('analytics');
                    setMenuOpen(false);
                  }}
                  icon={<TrendingUp className="w-5 h-5" />}
                  label="Analytics"
                />
                <MobileTabButton
                  active={activeTab === 'reputation'}
                  onClick={() => {
                    setActiveTab('reputation');
                    setMenuOpen(false);
                  }}
                  icon={<Award className="w-5 h-5" />}
                  label="Reputation"
                />
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'patrol' && <PatrolView />}
        {activeTab === 'incidents' && <IncidentReports />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'reputation' && <ReputationDashboard />}
      </main>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        active
          ? 'bg-primary text-white'
          : 'text-text-muted hover:text-fg hover:bg-surface-hover'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function MobileTabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
        active
          ? 'bg-primary text-white'
          : 'text-text-muted hover:text-fg hover:bg-surface-hover'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function PatrolView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <PatrolMap />
      </div>
      <div>
        <CheckpointList />
      </div>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-fg mb-6">Route Analytics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            label="Avg. Patrol Time"
            value="42 min"
            change="-8%"
            positive={true}
          />
          <MetricCard
            label="Checkpoints/Shift"
            value="8.2"
            change="+12%"
            positive={true}
          />
          <MetricCard
            label="Patrol Score"
            value="94/100"
            change="+3"
            positive={true}
          />
        </div>

        <div className="glass-card p-4 bg-surface-hover">
          <h3 className="text-lg font-semibold text-fg mb-4">Route Heatmap</h3>
          <div className="aspect-video bg-bg rounded-lg flex items-center justify-center">
            <p className="text-text-muted">Heatmap visualization coming soon</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-fg mb-4">AI Optimization Suggestions</h3>
        <div className="space-y-3">
          <SuggestionCard
            title="Route Optimization"
            description="Swap checkpoints 3 & 5 to save 8 min/shift"
            impact="high"
          />
          <SuggestionCard
            title="Time Management"
            description="Reduce time at checkpoint 7 by 3 minutes"
            impact="medium"
          />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, change, positive }: { label: string; value: string; change: string; positive: boolean }) {
  return (
    <div className="glass-card p-4">
      <div className="text-text-muted text-sm mb-1">{label}</div>
      <div className="text-2xl font-bold text-fg mb-1">{value}</div>
      <div className={`text-sm font-medium ${positive ? 'text-success' : 'text-danger'}`}>
        {change} vs last week
      </div>
    </div>
  );
}

function SuggestionCard({ title, description, impact }: { title: string; description: string; impact: 'high' | 'medium' | 'low' }) {
  const impactColors = {
    high: 'bg-success/20 text-success',
    medium: 'bg-warning/20 text-warning',
    low: 'bg-primary/20 text-primary',
  };

  return (
    <div className="glass-card p-4 hover:bg-surface-hover transition-all duration-200">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-fg">{title}</h4>
        <span className={`text-xs px-2 py-1 rounded-full ${impactColors[impact]}`}>
          {impact} impact
        </span>
      </div>
      <p className="text-sm text-text-muted">{description}</p>
    </div>
  );
}
