'use client';

import { Award, Clock, MapPin, TrendingUp, Camera, CheckCircle2 } from 'lucide-react';

const metrics = [
  {
    icon: Award,
    label: 'Total GRT',
    value: '156',
    change: '+12 this week',
    color: 'text-warning',
  },
  {
    icon: CheckCircle2,
    label: 'Checkpoints',
    value: '234',
    change: '+8 today',
    color: 'text-success',
  },
  {
    icon: Clock,
    label: 'Avg. Patrol Time',
    value: '42 min',
    change: '-5 min vs last week',
    color: 'text-primary',
  },
  {
    icon: TrendingUp,
    label: 'Patrol Score',
    value: '94/100',
    change: '+2 points',
    color: 'text-accent',
  },
  {
    icon: Camera,
    label: 'Incidents Logged',
    value: '12',
    change: '3 this week',
    color: 'text-danger',
  },
  {
    icon: MapPin,
    label: 'Properties',
    value: '5',
    change: 'Active routes',
    color: 'text-primary',
  },
];

export function MetricsOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Performance</h2>
        <div className="reputation-badge badge-pro">
          <Award className="w-4 h-4" />
          Pro Guard
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-surface-hover flex items-center justify-center`}>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </div>
            </div>
            <p className="text-sm text-text-muted mb-1">{metric.label}</p>
            <p className="text-2xl font-bold mb-1">{metric.value}</p>
            <p className="text-xs text-text-muted">{metric.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Checkpoint verified', location: 'North Gate', time: '5 min ago', type: 'success' },
            { action: 'Incident reported', location: 'East Entrance', time: '1 hour ago', type: 'warning' },
            { action: 'Shift completed', location: 'Oakwood Plaza', time: '2 hours ago', type: 'info' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'success' ? 'bg-success' :
                activity.type === 'warning' ? 'bg-warning' :
                'bg-primary'
              }`} />
              <div className="flex-1">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-text-muted">{activity.location}</p>
              </div>
              <p className="text-xs text-text-muted">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
