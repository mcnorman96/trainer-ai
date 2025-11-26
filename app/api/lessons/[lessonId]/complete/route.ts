import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest, context: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await context.params;
  if (!lessonId) {
    return NextResponse.json({ success: false, data: null, error: 'Missing lessonId' }, { status: 400 });
  }
  await prisma.lesson.update({
    where: { id: lessonId },
    data: { completed: true },
  });
  return NextResponse.json({ success: true, data: {}, error: null });
}
