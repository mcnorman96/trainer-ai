import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateFullLearningPath } from "@/lib/ai/generator";

export async function POST(req: NextRequest) {
  const { title } = await req.json();
  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const fullLearningPath = await generateFullLearningPath(title);
  console.log(fullLearningPath);
  
  return NextResponse.json({ success: true, fullLearningPath });
}

export async function GET() {
  const listOfGoal = await prisma.goal.findMany();
  return NextResponse.json({ success: true, listOfGoal });
}
