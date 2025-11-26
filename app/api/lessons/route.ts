import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lessonId = searchParams.get("lessonId");
  if (!lessonId) {
    return NextResponse.json({ success: false, data: null, error: "Missing lessonId" }, { status: 400 });
  }
  
  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
  if (!lesson) {
    return NextResponse.json({ success: false, data: null, error: "No lesson found for this goal" }, { status: 404 });
  }
  
  return NextResponse.json({ success: true, data: { lesson }, error: null });
}
