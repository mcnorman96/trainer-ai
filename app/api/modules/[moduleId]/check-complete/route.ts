import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest, context: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await context.params;
  if (!moduleId) {
    return NextResponse.json({ success: false, data: null, error: 'Missing moduleId' }, { status: 400 });
  }
  // Get all lessons for the module
  const lessons = await prisma.lesson.findMany({ where: { moduleId } });
  // If all lessons are completed, mark module as completed
  if (lessons.length > 0 && lessons.every(l => l.completed)) {
    await prisma.module.update({ where: { id: moduleId }, data: { completed: true } });
    return NextResponse.json({ success: true, data: { moduleCompleted: true }, error: null });
  }
  return NextResponse.json({ success: true, data: { moduleCompleted: false }, error: null });
}
