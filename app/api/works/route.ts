import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET() {
  try {
    const works = await prisma.workEntry.findMany({
      include: {
        workType: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(works);
  } catch (error) {
    console.error("Error fetching works:", error);
    return NextResponse.json(
      { error: "Failed to fetch works" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const workEntry = await prisma.workEntry.create({
      data: {
        date: new Date(body.date),
        workTypeId: body.workTypeId,
        volume: body.volume,
        unit: body.unit,
        executorName: body.executorName,
      },
      include: {
        workType: true,
      },
    });

    return NextResponse.json(workEntry, { status: 201 });
  } catch (error) {
    console.error("Error creating work entry:", error);
    return NextResponse.json(
      { error: "Failed to create work entry" },
      { status: 500 },
    );
  }
}
