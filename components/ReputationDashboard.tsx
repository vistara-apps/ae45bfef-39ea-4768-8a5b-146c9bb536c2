'use client';

import { Award, TrendingUp, Users, Share2 } from 'lucide-react';

export function ReputationDashboard() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-fg mb-6">Your Reputation</h2>
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">156 GRT</div>
            <div className="text-text-muted">Guard Reputation Tokens</div>
          </div>
          <div className="reputation-badge reputation-pro">
            <Award className="w-5 h-5" />
            <span>Pro Guard</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Patrol Score"
            value="94/100"
          />
          <StatCard
            icon={<Users className="w-5 h-5" />}
            label="Rank"
            value="#12"
          />
        </div>

        <button className="btn-primary w-full flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4" />
          <span>Share on Farcaster</span>
        </button>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-fg mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          <AchievementCard
            title="100 Checkpoints"
            description="Completed 100 verified checkpoints"
            date="2 days ago"
          />
          <AchievementCard
            title="Perfect Week"
            description="7 consecutive shifts with 100% completion"
            date="1 week ago"
          />
          <AchievementCard
            title="Quick Response"
            description="Reported 5 incidents within 1 minute"
            date="2 weeks ago"
          />
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-fg mb-4">Leaderboard</h3>
        <div className="space-y-3">
          <LeaderboardEntry rank={1} name="John Smith" grt={342} isYou={false} />
          <LeaderboardEntry rank={2} name="Sarah Johnson" grt={298} isYou={false} />
          <LeaderboardEntry rank={12} name="You" grt={156} isYou={true} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass-card p-4 bg-surface-hover">
      <div className="flex items-center gap-2 text-primary mb-2">
        {icon}
        <span className="text-sm text-text-muted">{label}</span>
      </div>
      <div className="text-2xl font-bold text-fg">{value}</div>
    </div>
  );
}

function AchievementCard({ title, description, date }: { title: string; description: string; date: string }) {
  return (
    <div className="glass-card p-4 hover:bg-surface-hover transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <Award className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-fg mb-1">{title}</h4>
          <p className="text-sm text-text-muted mb-1">{description}</p>
          <p className="text-xs text-text-muted">{date}</p>
        </div>
      </div>
    </div>
  );
}

function LeaderboardEntry({ rank, name, grt, isYou }: { rank: number; name: string; grt: number; isYou: boolean }) {
  return (
    <div className={`glass-card p-4 flex items-center justify-between ${isYou ? 'border-primary bg-primary/5' : ''}`}>
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
          rank === 1 ? 'bg-warning text-white' :
          rank === 2 ? 'bg-text-muted text-white' :
          'bg-surface text-text-muted'
        }`}>
          {rank}
        </div>
        <div>
          <div className="font-medium text-fg">{name}</div>
          <div className="text-sm text-text-muted">{grt} GRT</div>
        </div>
      </div>
      {isYou && (
        <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">You</span>
      )}
    </div>
  );
}
