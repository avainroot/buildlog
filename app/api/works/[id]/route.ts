import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";

const updateWorkSchema = z.object({
  date: z.iso.datetime(),
  workTypeId: z.number().int().positive(),
  volume: z.number().positive(),
  unit: z.string().min(1).max(20),
  executorName: z.string().min(1).max(100),
});

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId);

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
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId);
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
