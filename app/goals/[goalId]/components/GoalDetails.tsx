'use client';

import { useEffect, useState } from "react";
import SingleModule from "./SingleModule";
import { getModulesForGoal } from "../actions";
import { ModuleType } from "@/lib/types";

const GoalDetails = ({ goalId }: { goalId: string }) => {
  const [modules, setModules] = useState<ModuleType[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const getGoalModules = async () => {
      try {
        const modules = await getModulesForGoal(goalId);
        setModules(modules);
      } catch (err) {
        setError("Network error");
        console.error(err);
      }
    };
    
    getGoalModules();
  }, [goalId]);

  return (
    <>
      {error && <div className="text-red-400 font-medium mb-4">{error}</div>}
      {modules.length > 0 ? (
        <div className="space-y-6">
          {modules.map((module) => (
            <SingleModule key={module.id} goalId={goalId} module={module} />
          ))}
        </div>
      ) : (
        <div className="text-gray-400">No modules available for this goal.</div>
      )}
    </>
  );
};

export default GoalDetails;