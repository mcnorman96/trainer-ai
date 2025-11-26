'use server'

import { apiFetch } from '@/lib/apiFetch';
import { GoalType } from '@/lib/types';

export const getListOfGoals = async () => {
  const data: { listOfGoal: Array<GoalType> } = await apiFetch(`/api/goals`);
  return data.listOfGoal;
}

export const deleteGoal = async (goalId: string) => {
  const data: { deleteGoal: boolean } = await apiFetch(`/api/goals`, {
    method: 'DELETE',
    body: { goalId },
  });

  return data.deleteGoal;
};