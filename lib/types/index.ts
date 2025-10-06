import { Guard, Checkpoint, Patrol, CheckpointScan, IncidentReport, Property, ReputationToken, Severity, ReportFrequency } from '@prisma/client';

// Re-export Prisma types
export type {
  Guard,
  Checkpoint,
  Patrol,
  CheckpointScan,
  IncidentReport,
  Property,
  ReputationToken,
  Severity,
  ReportFrequency,
};

// Extended types with relations
export type GuardWithRelations = Guard & {
  patrols: Patrol[];
  incidentReports: IncidentReport[];
  reputationTokens: ReputationToken[];
};

export type PatrolWithRelations = Patrol & {
  guard: Guard;
  property: Property;
  checkpointScans: CheckpointScan[];
  incidentReports: IncidentReport[];
};

export type CheckpointScanWithRelations = CheckpointScan & {
  patrol: Patrol;
  checkpoint: Checkpoint;
};

export type IncidentReportWithRelations = IncidentReport & {
  patrol: Patrol;
  guard: Guard;
};

// API Request/Response types
export interface CreateGuardRequest {
  walletAddress: string;
  farcasterFID?: number;
  name: string;
  company: string;
}

export interface CreatePatrolRequest {
  guardID: string;
  propertyID: string;
  checkpointsRequired: number;
}

export interface CheckpointScanRequest {
  patrolID: string;
  checkpointID: string;
  gpsLat: number;
  gpsLong: number;
}

export interface IncidentReportRequest {
  patrolID: string;
  guardID: string;
  checkpointID?: string;
  photoData: string; // base64 encoded image
  gpsLat: number;
  gpsLong: number;
  severity: Severity;
}

export interface GenerateReportRequest {
  patrolID: string;
}

// Farcaster Frame types
export interface FrameData {
  fid: number;
  url: string;
  messageHash: string;
  timestamp: number;
  network: number;
  buttonIndex: number;
  inputText?: string;
  state?: string;
}

// MiniKit types
export interface MiniKitWallet {
  address: string;
  signTransaction: (tx: any) => Promise<string>;
}

// Service response types
export interface GPSVerificationResult {
  verified: boolean;
  distance: number;
  tolerance: number;
}

export interface AISummaryResult {
  summary: string;
  severity: Severity;
}

export interface IPFSUploadResult {
  hash: string;
  url: string;
  thumbnailUrl: string;
}

// UI State types
export interface PatrolState {
  currentPatrol: PatrolWithRelations | null;
  scannedCheckpoints: string[];
  incidents: IncidentReportWithRelations[];
  isActive: boolean;
}

export interface DashboardStats {
  totalPatrols: number;
  totalCheckpoints: number;
  averageScore: number;
  totalGRT: number;
  recentIncidents: IncidentReportWithRelations[];
}

// Map types
export interface MapMarker {
  id: string;
  latitude: number;
  longitude: number;
  type: 'checkpoint' | 'incident';
  status?: 'pending' | 'verified' | 'skipped';
  severity?: Severity;
  title: string;
  description?: string;
}

// Heatmap data types
export interface HeatmapPoint {
  latitude: number;
  longitude: number;
  intensity: number; // 0-1 scale
  timeSpent: number; // minutes
}

// Report generation types
export interface PatrolReport {
  patrolID: string;
  guardName: string;
  propertyName: string;
  startTime: Date;
  endTime: Date;
  checkpointsCompleted: number;
  checkpointsRequired: number;
  patrolScore: number;
  incidents: IncidentReport[];
  totalGRT: number;
  routeMap: any; // GeoJSON
}

