import { FullLearningPathType } from './../types';
import { roadmapPrompt } from "./prompts/roadmapPrompt";
import { modulePrompt } from "./prompts/modulePrompt";
import { quizPrompt } from "./prompts/quizPrompt";
import { explainPrompt } from "./prompts/explainPrompt";
import { createDbGoal, createDbLesson, createDbModule, createDbQuiz, createDbRoadmap, generate } from "../utils";
import { prisma } from "../db";
import goalDescription from "./test-data/goalDescription.json";
import roadmap from "./test-data/roadmap.json";
import moduleData from "./test-data/module.json";
import quiz from "./test-data/quiz.json";
import explanation from "./test-data/explanation.json";
import { goalPrompt } from "./prompts/goalPrompt";
import type { ModuleData, LessonData, RoadmapData, GoalData, QuizData, ExplanationData } from "../types";

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
  return generate(promptGoal, 300);
}

export async function generateRoadmap(goalTitle: string) {
  if (useTestData) return getTestData('roadmap');
  const promptRoadmap = roadmapPrompt.replace("{{goal}}", goalTitle);
  return generate(promptRoadmap, 800);
}

export async function generateModule(moduleInfo: string) {
  if (useTestData) return getTestData('module');
  const promptModule = modulePrompt.replace("{{moduleInfo}}", moduleInfo);
  return generate(promptModule, 600);
}

export async function generateQuiz(topic: string) {
  if (useTestData) return getTestData('quiz');
  const promptQuiz = quizPrompt.replace("{{topic}}", topic);
  return generate(promptQuiz, 500);
}

export async function generateExplanation(concept: string) {
  if (useTestData) return getTestData('explanation');
  const promptExplanation = explainPrompt.replace("{{concept}}", concept);
  return generate(promptExplanation, 1500);
}

export async function generateFullLearningPath(goalTitle: string) {
  const goal = await generateGoalDescription(goalTitle) as GoalData;
  const dbGoal = await createDbGoal(goal);

  const roadmap = await generateRoadmap(goalTitle) as RoadmapData;
  const dbRoadmap = await createDbRoadmap(dbGoal.id);

  const dbModules = [];
  for (const [moduleIndex, moduleItem] of roadmap.modules.entries()) {
    const generatedModule = await generateModule(JSON.stringify(moduleItem)) as ModuleData;
    const dbModule = await createDbModule(generatedModule, dbRoadmap.id, moduleIndex + 1);

    const dbLessons = [];
    for (const [lessonIndex, lesson] of generatedModule.lessons.entries()) {
      const [explanation, quiz] = await Promise.all([
        generateExplanation(lesson.title) as Promise<ExplanationData>,
        generateQuiz(lesson.title) as Promise<QuizData>,
      ]);

      const dbLesson = await createDbLesson(lesson, dbModule.id, lessonIndex + 1, explanation.explanation);
      const dbQuiz = await createDbQuiz(dbLesson.id, quiz.questions);

      dbLessons.push({ ...dbLesson, quiz: dbQuiz, explanation: explanation.explanation });
    }

    dbModules.push({ ...dbModule, lessons: dbLessons });
  }

  const FullLearningPathObject = {
    goal: dbGoal,
    roadmap: dbRoadmap,
    modules: dbModules,
  };

  console.log(FullLearningPathObject);
  
  return FullLearningPathObject;
}
