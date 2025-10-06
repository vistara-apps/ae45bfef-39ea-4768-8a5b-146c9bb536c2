'use client';

import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { Shield, Bell } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="glass-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">PatrolProof</h1>
              <p className="text-xs text-text-muted">Active Patrol</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-surface hover:bg-surface-hover flex items-center justify-center transition-colors duration-200">
              <Bell className="w-5 h-5 text-text-muted" />
            </button>
            
            <Wallet>
              <ConnectWallet>
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8" />
                  <Name className="text-sm font-medium" />
                </div>
              </ConnectWallet>
            </Wallet>
          </div>
        </div>
      </div>
    </header>
  );
}
