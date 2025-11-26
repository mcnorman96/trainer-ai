import { FullLearningPathType } from './../lib/types';
import { apiFetch } from "@/lib/apiFetch";

export const createNewGoal = async (goal: string) => {
  const data: {fullLearningPath: FullLearningPathType} = await apiFetch('/api/goals', {
    method: 'POST',
    body: { title: goal },
  });

  return data.fullLearningPath;
}
