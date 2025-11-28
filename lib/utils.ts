import { openai } from "@/lib/ai/openai";
import { prisma } from "./db";
import { GoalData, LessonData, ModuleData, QuizData } from "./types";

export const generate = async (prompt: string, maxTokens = 500) => {
  prompt += "\n\nReturn only valid, complete JSON. Do not include any extra text.";

  maxTokens = Math.min(maxTokens, 2000); // Increase token limit for longer responses

  const res = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: maxTokens,
    response_format: { type: "json_object" },
  });

  try {
    let response = res.choices[0].message.content!;
    response = finaliseJson(response);
    return response;
  } catch (err) {
    console.error("AI JSON Parse Error:", err);
    console.log("Raw response:", res.choices[0].message.content);

    // Fallback: return a default explanation if parsing fails
    return { explanation: "Content too long or incomplete. Please try a shorter topic or reduce details." };
  }
}

export const finaliseJson = (jsonString: string) => {
  let raw = jsonString;
  
  raw = raw.replace(/,\s*([}\]])/g, '$1');
  raw = raw.replace(/[“”]/g, '"');
  
  const openBraces = (raw.match(/{/g) || []).length;
  const closeBraces = (raw.match(/}/g) || []).length;
  if (openBraces > closeBraces) {
    raw += '}'.repeat(openBraces - closeBraces);
  }
  
  return JSON.parse(raw);
}

export const createDbGoal = async (goalData: GoalData) => {
  return prisma.goal.create({
    data: {
      title: goalData.title,
      description: goalData.description,
    },
  });
}

export const createDbRoadmap = async (goalId: string) => {
  return prisma.roadmap.create({
    data: {
      goalId,
    },
  });
}

export const createDbModule = async (moduleData: ModuleData, roadmapId: string, order: number) => {
  return prisma.module.create({
    data: {
      title: moduleData.title,
      description: moduleData.description,
      order,
      roadmapId,
    },
  });
}

export const createDbLesson = async (lessonData: LessonData, moduleId: string, order: number, explanation: string) => {
  return prisma.lesson.create({
    data: {
      title: lessonData.title,
      shortContent: lessonData.content,
      content: explanation,
      order,
      moduleId,
    },
  });
}

export const createDbQuiz = async (lessonId: string, questions: QuizData['questions']) => {
  return prisma.quiz.create({
    data: {
      lessonId,
      questions,
    },
  });
}