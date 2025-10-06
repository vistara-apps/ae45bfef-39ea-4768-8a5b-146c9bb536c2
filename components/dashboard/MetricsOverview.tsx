'use client';

import { Award, Clock, MapPin, TrendingUp, Camera, CheckCircle2 } from 'lucide-react';
import { PatrolWithRelations } from '@/lib/types';

interface MetricsOverviewProps {
  patrol: PatrolWithRelations | null;
}

export function MetricsOverview({ patrol }: MetricsOverviewProps) {
  if (!patrol) {
    return (
      <div className="glass-card p-8 text-center">
        <Award className="w-12 h-12 text-text-muted mx-auto mb-4" />
        <p className="text-text-muted">No patrol data available</p>
        <p className="text-sm text-text-muted mt-2">Complete patrols to see your performance metrics</p>
      </div>
    );
  }

  const checkpointsCompleted = patrol.checkpointScans.filter(scan => scan.verified).length;
  const totalGRT = patrol.checkpointScans.reduce((sum, scan) => sum + scan.grtAwarded, 0);
  const patrolScore = patrol.checkpointsRequired > 0
    ? Math.round((checkpointsCompleted / patrol.checkpointsRequired) * 100)
    : 0;

  // Calculate patrol duration
  const patrolDuration = patrol.endTime
    ? Math.round((patrol.endTime.getTime() - patrol.startTime.getTime()) / (1000 * 60)) // minutes
    : Math.round((Date.now() - patrol.startTime.getTime()) / (1000 * 60));

  // Determine reputation badge
  const getReputationBadge = (totalGRT: number) => {
    if (totalGRT >= 200) return { type: 'elite', label: 'Elite Guard' };
    if (totalGRT >= 50) return { type: 'pro', label: 'Pro Guard' };
    return { type: 'rookie', label: 'Rookie Guard' };
  };

  const reputationBadge = getReputationBadge(patrol.guard.totalGRT);

  const metrics = [
    {
      icon: Award,
      label: 'Total GRT',
      value: patrol.guard.totalGRT.toString(),
      change: `+${totalGRT} this patrol`,
      color: 'text-warning',
    },
    {
      icon: CheckCircle2,
      label: 'Checkpoints',
      value: patrol.guard.totalCheckpoints.toString(),
      change: `+${checkpointsCompleted} this patrol`,
      color: 'text-success',
    },
    {
      icon: Clock,
      label: 'Patrol Time',
      value: `${patrolDuration} min`,
      change: patrol.endTime ? 'Completed' : 'In progress',
      color: 'text-primary',
    },
    {
      icon: TrendingUp,
      label: 'Patrol Score',
      value: `${patrolScore}/100`,
      change: patrolScore >= 80 ? 'Excellent' : patrolScore >= 60 ? 'Good' : 'Needs improvement',
      color: 'text-accent',
    },
    {
      icon: Camera,
      label: 'Incidents Logged',
      value: patrol.incidentReports.length.toString(),
      change: 'This patrol',
      color: 'text-danger',
    },
    {
      icon: MapPin,
      label: 'Properties',
      value: '1', // Current property
      change: patrol.property.name,
      color: 'text-primary',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Performance</h2>
        <div className={`reputation-badge badge-${reputationBadge.type}`}>
          <Award className="w-4 h-4" />
          {reputationBadge.label}
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
            ...patrol.checkpointScans.slice(-3).map(scan => ({
              action: 'Checkpoint verified',
              location: patrol.property.checkpoints.find(c => c.id === scan.checkpointID)?.locationName || 'Unknown',
              time: new Date(scan.scannedAt).toLocaleString(),
              type: 'success' as const,
            })),
            ...patrol.incidentReports.slice(-2).map(incident => ({
              action: 'Incident reported',
              location: patrol.property.checkpoints.find(c => c.id === incident.checkpointID)?.locationName || 'Unknown',
              time: new Date(incident.reportedAt).toLocaleString(),
              type: 'warning' as const,
            })),
          ].slice(-5).map((activity, index) => (
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
