import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { CreateGuardRequest } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: CreateGuardRequest = await request.json();

    // Validate required fields
    if (!body.walletAddress || !body.name || !body.company) {
      return NextResponse.json(
        { error: 'Missing required fields: walletAddress, name, company' },
        { status: 400 }
      );
    }

    // Check if guard already exists
    const existingGuard = await prisma.guard.findUnique({
      where: { walletAddress: body.walletAddress },
    });

    if (existingGuard) {
      return NextResponse.json(existingGuard);
    }

    // Create new guard
    const guard = await prisma.guard.create({
      data: {
        walletAddress: body.walletAddress,
        farcasterFID: body.farcasterFID,
        name: body.name,
        company: body.company,
      },
    });

    return NextResponse.json(guard);
  } catch (error) {
    console.error('Error creating guard:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'walletAddress parameter is required' },
        { status: 400 }
      );
    }

    const guard = await prisma.guard.findUnique({
      where: { walletAddress },
      include: {
        patrols: {
          include: {
            property: true,
            checkpointScans: true,
            incidentReports: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        reputationTokens: {
          orderBy: { awardedAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!guard) {
      return NextResponse.json(
        { error: 'Guard not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(guard);
  } catch (error) {
    console.error('Error fetching guard:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

