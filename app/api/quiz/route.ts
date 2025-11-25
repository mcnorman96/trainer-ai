import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lessonId = searchParams.get("lessonId");
  if (!lessonId) {
    return NextResponse.json({ success: false, error: "Missing lessonId" }, { status: 400 });
  }
  
  const quiz = await prisma.quiz.findUnique({ where: { lessonId } });
  if (!quiz) {
    return NextResponse.json({ success: false, error: "No quiz found for this lesson" }, { status: 404 });
  }
  
  return NextResponse.json({ success: true, quiz });
}
