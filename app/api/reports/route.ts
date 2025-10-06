import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendPatrolReport } from '@/lib/services/resend';
import { PatrolReport } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { patrolID }: { patrolID: string } = await request.json();

    if (!patrolID) {
      return NextResponse.json(
        { error: 'patrolID is required' },
        { status: 400 }
      );
    }

    // Get patrol with all related data
    const patrol = await prisma.patrol.findUnique({
      where: { id: patrolID },
      include: {
        guard: true,
        property: true,
        checkpointScans: {
          include: {
            checkpoint: true,
          },
        },
        incidentReports: true,
      },
    });

    if (!patrol) {
      return NextResponse.json(
        { error: 'Patrol not found' },
        { status: 404 }
      );
    }

    // Complete the patrol if not already completed
    if (!patrol.endTime) {
      await prisma.patrol.update({
        where: { id: patrolID },
        data: { endTime: new Date() },
      });
    }

    // Calculate patrol score
    const checkpointsCompleted = patrol.checkpointScans.filter(scan => scan.verified).length;
    const patrolScore = Math.round((checkpointsCompleted / patrol.checkpointsRequired) * 100);

    // Calculate total GRT earned
    const totalGRT = patrol.checkpointScans.reduce((sum, scan) => sum + scan.grtAwarded, 0);

    // Generate report data
    const report: PatrolReport = {
      patrolID,
      guardName: patrol.guard.name,
      propertyName: patrol.property.name,
      startTime: patrol.startTime,
      endTime: patrol.endTime || new Date(),
      checkpointsCompleted,
      checkpointsRequired: patrol.checkpointsRequired,
      patrolScore,
      incidents: patrol.incidentReports,
      totalGRT,
      routeMap: patrol.routeGeoJSON,
    };

    // Send email report to client
    await sendPatrolReport(report, patrol.property.clientEmail, patrol.property.name);

    return NextResponse.json({
      success: true,
      report,
      message: 'Report generated and sent to client',
    });
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

