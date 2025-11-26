import { openai } from "./openai";
import { roadmapPrompt } from "./prompts/roadmapPrompt";
import { modulePrompt } from "./prompts/modulePrompt";
import { quizPrompt } from "./prompts/quizPrompt";
import { explainPrompt } from "./prompts/explainPrompt";
import { generate } from "../utils";
import { prisma } from "../db";
import type { Module, Lesson } from "@prisma/client";
import { QuizType } from "../types";
import goalDescription from "./test-data/goalDescription.json";
import roadmap from "./test-data/roadmap.json";
import moduleData from "./test-data/module.json";
import quiz from "./test-data/quiz.json";
import explanation from "./test-data/explanation.json";
import { goalPrompt } from "./prompts/goalPrompt";

const useTestData = process.env.USE_TEST_DATA === "true";
const testData = {
  goalDescription,
  roadmap,
  module: moduleData,
  quiz,
  explanation,
};

export const getTestData = (type: keyof typeof testData) => {
  return testData[type];
}

export async function generateGoalDescription(title: string) {
  if (useTestData) return getTestData('goalDescription');
  const promptGoal = goalPrompt.replace("{{title}}", title);
  return generate(openai, promptGoal, 300);
}

export async function generateRoadmap(goalTitle: string) {
  if (useTestData) return getTestData('roadmap');
  const promptRoadmap = roadmapPrompt.replace("{{goal}}", goalTitle);
  return generate(openai, promptRoadmap, 800);
}

export async function generateModule(moduleInfo: string) {
  if (useTestData) return getTestData('module');
  const promptModule = modulePrompt.replace("{{moduleInfo}}", moduleInfo);
  return generate(openai, promptModule, 600);
}

export async function generateQuiz(topic: string) {
  if (useTestData) return getTestData('quiz');
  const promptQuiz = quizPrompt.replace("{{topic}}", topic);
  return generate(openai, promptQuiz, 500);
}

export async function generateExplanation(concept: string) {
  if (useTestData) return getTestData('explanation');
  const promptExplanation = explainPrompt.replace("{{concept}}", concept);
  return generate(openai, promptExplanation, 1500);
}

export async function generateFullLearningPath(goalTitle: string) {
  const goal = await generateGoalDescription(goalTitle);
  const dbGoal = await prisma.goal.create({
    data: {
      title: goal.title,
      description: goal.description,
    },
  });

  const roadmap = await generateRoadmap(goalTitle);
  const dbRoadmap = await prisma.roadmap.create({
    data: {
      goalId: dbGoal.id,
    },
  });

  const dbModules: Array<Module & { lessons: Array<Lesson & { quiz: QuizType; explanation: string }> }> = [];
  
  for (const moduleItem of roadmap.modules) {
    const generated = await generateModule(
      JSON.stringify({ title: moduleItem.title, description: moduleItem.description })
    );

    const dbModule: Module = await prisma.module.create({
      data: {
        title: generated.title,
        description: generated.description,
        order: dbModules.length + 1,
        roadmapId: dbRoadmap.id,
      },
    });

    const dbLessons: Array<Lesson & { quiz: QuizType; explanation: string }> = [];
    for (const lesson of generated.lessons) {
      const quiz = await generateQuiz(lesson.title);
      const explanation = await generateExplanation(lesson.title);

      const dbLesson: Lesson = await prisma.lesson.create({
        data: {
          title: lesson.title,
          shortContent: lesson.content, 
          content: explanation.explanation,
          order: dbLessons.length + 1,
          moduleId: dbModule.id,
        },
      });

      const dbQuiz = await prisma.quiz.create({
        data: {
          lessonId: dbLesson.id,
          questions: quiz.questions,
        },
      });

      dbLessons.push({
        ...dbLesson,
        quiz: dbQuiz,
        explanation,
      });
    }
    dbModules.push({
      ...dbModule,
      lessons: dbLessons,
    });
  }

  return {
    goal: dbGoal,
    roadmap: dbRoadmap,
    modules: dbModules,
  };
}
