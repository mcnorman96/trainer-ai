import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const goalId = searchParams.get("goalId");
  if (!goalId) {
    return NextResponse.json({ success: false, data: null, error: "Missing goalId" }, { status: 400 });
  }
  
  const roadmap = await prisma.roadmap.findUnique({ where: { goalId } });
  if (!roadmap) {
    return NextResponse.json({ success: false, data: null, error: "No roadmap found for this goal" }, { status: 404 });
  }
  
  const modules = await prisma.module.findMany({
    where: { roadmapId: roadmap.id },
    include: { lessons: true },
  });
  
  return NextResponse.json({ success: true, data: { modules }, error: null });
}
