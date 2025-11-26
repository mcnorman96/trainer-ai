import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ success: false, data: null, error: "Missing goal ID" }, { status: 400 });
  }

  const roadmap = await prisma.roadmap.findUnique({ where: { goalId: id } });

  if (roadmap) {
    const modules = await prisma.module.findMany({ where: { roadmapId: roadmap.id } });

    for (const mod of modules) {
      await prisma.quiz.deleteMany({ where: { lesson: { moduleId: mod.id } } });
      await prisma.lesson.deleteMany({ where: { moduleId: mod.id } });
    }

    await prisma.module.deleteMany({ where: { roadmapId: roadmap.id } });
    await prisma.roadmap.delete({ where: { id: roadmap.id } });
  }

  const deleteGoal = await prisma.goal.delete({ where: { id } });
  return NextResponse.json({ success: true, data: { deleteGoal }, error: null });
}