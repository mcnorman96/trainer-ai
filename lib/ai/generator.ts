import { openai } from "./openai";
import { roadmapPrompt } from "./prompts/roadmapPrompt";
import { modulePrompt } from "./prompts/modulePrompt";
import { quizPrompt } from "./prompts/quizPrompt";
import { explainPrompt } from "./prompts/explainPrompt";
import { generate } from "../utils";
import { prisma } from "../db";
import type { Module, Lesson } from "@prisma/client";

export async function generateGoalDescription(title: string) {
  return {
    title,
    description: `This is a detailed mock description for the goal "${title}". It explains what the user will achieve, why it matters, and what outcomes to expect.`,
  };
  
  const prompt = `
  You are generating a detailed educational goal description.
  Return only JSON.

  {
    "title": "${title}",
    "description": "A detailed, motivating explanation of the goal"
  }
  `;

  return generate(openai, prompt, 300);
}

export async function generateRoadmap(goalTitle: string) {
  return {
    modules: [
      {
        title: "Module 1: Foundations",
        description: "Mock description for module 1",
      },
      {
        title: "Module 2: Core Concepts",
        description: "Mock description for module 2",
      },
      {
        title: "Module 3: Advanced Skills",
        description: "Mock description for module 3",
      },
    ],
  };

  const prompt = roadmapPrompt.replace("{{goal}}", goalTitle);
  return generate(openai,prompt, 800);
}

export async function generateModule(moduleInfo: string) {
  const parsed = JSON.parse(moduleInfo);

  return {
    title: parsed.title,
    description: parsed.description,
    lessons: [
      {
        title: `${parsed.title} - Lesson 1`,
        content: "This is mock lesson content (1)",
      },
      {
        title: `${parsed.title} - Lesson 2`,
        content: "This is mock lesson content (2)",
      },
    ],
  };

  const prompt = modulePrompt.replace("{{moduleInfo}}", moduleInfo);
  return generate(openai,prompt, 600);
}

export async function generateQuiz(topic: string) {
  return {
    questions: [
      {
        question: `What is the definition of ${topic}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        answer: "Option A",
      },
      {
        question: `Why is ${topic} important?`,
        options: ["Reason 1", "Reason 2", "Reason 3", "Reason 4"],
        answer: "Reason 2",
      },
    ],
  };

  const prompt = quizPrompt.replace("{{topic}}", topic);
  return generate(openai, prompt, 300);
}

export async function generateExplanation(concept: string) {
  return {
    explanation: `This is a mock explanation for the concept: ${concept}. It breaks down the idea into simple steps.`,
  };
  const prompt = explainPrompt.replace("{{concept}}", concept);
  return generate(openai,prompt, 300);
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

  const dbModules: Array<Module & { lessons: Array<Lesson & { quiz: any; explanation: any }> }> = [];
  
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

    const dbLessons: Array<Lesson & { quiz: any; explanation: any }> = [];
    for (const lesson of generated.lessons) {
      const quiz = await generateQuiz(lesson.title);
      const explanation = await generateExplanation(lesson.title);

      const dbLesson: Lesson = await prisma.lesson.create({
        data: {
          title: lesson.title,
          content: lesson.content,
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
