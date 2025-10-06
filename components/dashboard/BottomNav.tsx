'use client';

import { Map, List, BarChart3, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'map' | 'checkpoints' | 'metrics';
  onTabChange: (tab: 'map' | 'checkpoints' | 'metrics') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'map' as const, icon: Map, label: 'Map' },
    { id: 'checkpoints' as const, icon: List, label: 'Checkpoints' },
    { id: 'metrics' as const, icon: BarChart3, label: 'Metrics' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-border z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-primary bg-primary/10'
                  : 'text-text-muted hover:text-fg'
              }`}
            >
              <tab.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
