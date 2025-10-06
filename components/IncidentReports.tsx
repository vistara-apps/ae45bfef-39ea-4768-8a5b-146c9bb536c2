'use client';

import { Camera, AlertCircle, Clock } from 'lucide-react';

interface Incident {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  time: string;
  location: string;
}

const mockIncidents: Incident[] = [
  {
    id: '1',
    title: 'Broken Lock',
    description: 'Broken lock on North Gate, rust visible on metal frame',
    severity: 'high',
    time: '10:15 PM',
    location: 'North Gate',
  },
  {
    id: '2',
    title: 'Suspicious Activity',
    description: 'Unknown vehicle parked in restricted area for 15+ minutes',
    severity: 'medium',
    time: '9:45 PM',
    location: 'East Parking',
  },
  {
    id: '3',
    title: 'Light Malfunction',
    description: 'Exterior light flickering near main entrance',
    severity: 'low',
    time: '9:30 PM',
    location: 'Main Lobby',
  },
];

export function IncidentReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-fg">Incident Reports</h2>
        <button className="btn-danger flex items-center gap-2">
          <Camera className="w-4 h-4" />
          <span>Report Incident</span>
        </button>
      </div>

      <div className="space-y-4">
        {mockIncidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </div>

      {mockIncidents.length === 0 && (
        <div className="glass-card p-12 text-center">
          <AlertCircle className="w-16 h-16 text-text-muted mx-auto mb-4" />
          <p className="text-text-muted">No incidents reported this shift</p>
        </div>
      )}
    </div>
  );
}

function IncidentCard({ incident }: { incident: Incident }) {
  const severityStyles = {
    low: 'incident-low',
    medium: 'incident-medium',
    high: 'incident-high',
  };

  const severityBadges = {
    low: 'bg-primary/20 text-primary',
    medium: 'bg-warning/20 text-warning',
    high: 'bg-danger/20 text-danger',
  };

  return (
    <div className={`incident-card ${severityStyles[incident.severity]}`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-fg">{incident.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${severityBadges[incident.severity]}`}>
          {incident.severity}
        </span>
      </div>
      
      <p className="text-text-muted mb-4">{incident.description}</p>
      
      <div className="flex items-center gap-4 text-sm text-text-muted">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{incident.time}</span>
        </div>
        <div className="flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          <span>{incident.location}</span>
        </div>
      </div>
    </div>
  );
}
