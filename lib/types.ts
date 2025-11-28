export type GoalType = {
  id: string;
  createdAt: Date;
  title: string;
  description?: string | null;
  roadmap?: RoadmapType | null;
};

export type RoadmapType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  goalId: string;
  goal: GoalType;
  modules: ModuleType[];
};

export type ModuleType = {
  id: string;
  title: string;
  description?: string | null;
  order: number;
  roadmapId: string;
  roadmap: RoadmapType;
  lessons: LessonType[];
  completed: boolean;
};

export type LessonType = {
  id: string;
  title: string;
  shortContent: string;
  content: string;
  order: number;
  moduleId: string;
  module: ModuleType;
  quiz?: QuizType | null;
  completed: boolean;
};

export type QuizType = {
  id: string;
  lessonId: string;
  lesson: LessonType;
  questions: Array<{
    question: string;
    options: string[];
    answer: string;
  }>;
};

export type FullLearningPathType = {
  goal: GoalType;
  roadmap: RoadmapType;
  modules: ModuleType[];
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type CreateGoalResponse = ApiResponse<{
  fullLearningPath: FullLearningPathType;
}>;

export type GetGoalsResponse = ApiResponse<{
  listOfGoal: GoalType[];
}>;

export type ModuleData = {
  title: string;
  description: string;
  lessons: LessonData[];
}
export type LessonData = {
  title: string;
  content: string;
}
export type RoadmapData = {
  modules: ModuleData[];
}
export type GoalData = {
  title: string;
  description: string;
}
export type QuizData = {
  questions: Array<{ question: string; options: string[]; answer: string }>;
}
export type ExplanationData = {
  explanation: string;
}
