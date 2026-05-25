import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const works = await prisma.workType.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(works);
  } catch (error) {
    console.error("Error fetching works type:", error);
    return NextResponse.json(
      { error: "Failed to fetch works type" },
      { status: 500 },
    );
  }
}
