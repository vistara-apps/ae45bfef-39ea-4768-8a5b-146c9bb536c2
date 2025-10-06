import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { CreatePatrolRequest } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: CreatePatrolRequest = await request.json();

    // Validate required fields
    if (!body.guardID || !body.propertyID || !body.checkpointsRequired) {
      return NextResponse.json(
        { error: 'Missing required fields: guardID, propertyID, checkpointsRequired' },
        { status: 400 }
      );
    }

    // Verify guard exists
    const guard = await prisma.guard.findUnique({
      where: { id: body.guardID },
    });

    if (!guard) {
      return NextResponse.json(
        { error: 'Guard not found' },
        { status: 404 }
      );
    }

    // Verify property exists
    const property = await prisma.property.findUnique({
      where: { id: body.propertyID },
    });

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Create new patrol
    const patrol = await prisma.patrol.create({
      data: {
        guardID: body.guardID,
        propertyID: body.propertyID,
        checkpointsRequired: body.checkpointsRequired,
        startTime: new Date(),
      },
      include: {
        guard: true,
        property: true,
      },
    });

    return NextResponse.json(patrol);
  } catch (error) {
    console.error('Error creating patrol:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const guardID = searchParams.get('guardID');
    const propertyID = searchParams.get('propertyID');
    const status = searchParams.get('status'); // 'active', 'completed'

    let where: any = {};

    if (guardID) {
      where.guardID = guardID;
    }

    if (propertyID) {
      where.propertyID = propertyID;
    }

    if (status === 'active') {
      where.endTime = null;
    } else if (status === 'completed') {
      where.endTime = { not: null };
    }

    const patrols = await prisma.patrol.findMany({
      where,
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
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(patrols);
  } catch (error) {
    console.error('Error fetching patrols:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

