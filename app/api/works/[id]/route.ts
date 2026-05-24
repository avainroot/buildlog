import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const updateWorkSchema = z.object({
  date: z.coerce.date().optional(),
  workTypeId: z.number().optional(),
  volume: z.number().optional(),
  unit: z.string().optional(),
  executorName: z.string().optional(),
});

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id);

    await prisma.workEntry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting work entry:", error);
    return NextResponse.json(
      { error: "Failed to delete work entry" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const validData = updateWorkSchema.parse(body);

    const workEntry = await prisma.workEntry.update({
      where: { id },
      data: validData,
      include: { workType: true },
    });

    return NextResponse.json(workEntry);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 },
      );
    }

    console.error("Error updating work entry:", error);
    return NextResponse.json(
      { error: "Failed to update work entry" },
      { status: 500 },
    );
  }
}
