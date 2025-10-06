import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { uploadToIPFS, generateIncidentSummary } from '@/lib/services';
import { IncidentReportRequest } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: IncidentReportRequest = await request.json();

    // Validate required fields
    if (!body.patrolID || !body.guardID || !body.photoData || !body.gpsLat || !body.gpsLong) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify patrol exists and is active
    const patrol = await prisma.patrol.findUnique({
      where: { id: body.patrolID },
    });

    if (!patrol || patrol.endTime) {
      return NextResponse.json(
        { error: 'Invalid or completed patrol' },
        { status: 400 }
      );
    }

    // Upload photo to IPFS
    const ipfsResult = await uploadToIPFS(body.photoData, `incident-${Date.now()}.jpg`);

    // Generate AI summary
    const aiResult = await generateIncidentSummary(body.photoData);

    // Create incident report
    const incident = await prisma.incidentReport.create({
      data: {
        patrolID: body.patrolID,
        guardID: body.guardID,
        checkpointID: body.checkpointID,
        photoIPFSHash: ipfsResult.hash,
        photoThumbnailURL: ipfsResult.thumbnailUrl,
        aiSummary: aiResult.summary,
        reportedAt: new Date(),
        gpsLat: body.gpsLat,
        gpsLong: body.gpsLong,
        severity: aiResult.severity,
        // txHash would be set after on-chain transaction
      },
      include: {
        patrol: {
          include: {
            property: true,
          },
        },
        guard: true,
      },
    });

    // Send email notification to client if high severity
    if (aiResult.severity === 'high') {
      // This would trigger email sending
      console.log(`High severity incident reported for ${patrol.property.name}`);
    }

    return NextResponse.json(incident);
  } catch (error) {
    console.error('Error creating incident report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const patrolID = searchParams.get('patrolID');
    const guardID = searchParams.get('guardID');

    let where: any = {};

    if (patrolID) {
      where.patrolID = patrolID;
    }

    if (guardID) {
      where.guardID = guardID;
    }

    const incidents = await prisma.incidentReport.findMany({
      where,
      include: {
        patrol: {
          include: {
            property: true,
          },
        },
        guard: true,
      },
      orderBy: { reportedAt: 'desc' },
    });

    return NextResponse.json(incidents);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

