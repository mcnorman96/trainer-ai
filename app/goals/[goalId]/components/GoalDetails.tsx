'use client';

import React, { useEffect, useState } from "react";
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
    <div className="w-full bg-gray-900 rounded-xl shadow-lg p-6 mt-10 border border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-white">Learning Path for Goal</h2>
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
    </div>
  );
};

export default GoalDetails;