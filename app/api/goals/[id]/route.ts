import { NextRequest, NextResponse } from "next/server";
import { generateGoalDescription } from "@/lib/ai/openai";
import { prisma } from "@/lib/db";

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "Missing goal ID" }, { status: 400 });
  }
  const deleteGoal = await prisma.goal.delete({
    where: { id }
  });
  return NextResponse.json({ success: true, deleteGoal });
}