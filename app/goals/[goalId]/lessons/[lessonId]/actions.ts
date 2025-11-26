'use server';

import { apiFetch } from "@/lib/apiFetch";
import { LessonType, QuizType } from "@/lib/types";

export const getLessonForModule = async (lessonId: string) => {
  const data = await apiFetch<{ lesson: LessonType }>(`/api/lessons?lessonId=${lessonId}`);
  return data.lesson;
}

export const getQuizForLesson = async (lessonId: string) => {
  const data = await apiFetch<{ quiz: QuizType }>(`/api/quizzes?lessonId=${lessonId}`);
  return data.quiz;
}

export const markLessonComplete = async (lessonId: string) => {
  await apiFetch<{}>(`/api/lessons/${lessonId}/complete`, {
    method: 'POST',
  });
  return true;
}

export const checkAndMarkModuleComplete = async (moduleId: string) => {
  await apiFetch<{ moduleCompleted: boolean }>(`/api/modules/${moduleId}/check-complete`, {
    method: 'POST',
  });
  return true;
}