'use server'

import { apiFetch } from '@/lib/apiFetch';

export const getListOfGoals = async () => {
  const data = await apiFetch<{ listOfGoal: any[] }>(`/api/goals`);
  return data.listOfGoal;
}

export const deleteGoal = async (goalId: string) => {
  const data = await apiFetch<{ deleteGoal: boolean }>(`/api/goals`, {
    method: 'DELETE',
    body: { goalId },
  });
  return data;
};