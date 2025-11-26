'use server';

import { apiFetch } from "@/lib/apiFetch";
import { ModuleType } from "@/lib/types";

export const getModulesForGoal = async (goalId: string) => {
  const data = await apiFetch<{ modules: ModuleType[] }>(`/api/modules?goalId=${goalId}`);
  return data.modules;
}