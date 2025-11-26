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
    <>
      <h2>Learning path for goal</h2>
      {error && <div className="text-red-500">{error}</div>}
      {modules.length > 0 ? (
        modules.map((module) => (
            <SingleModule key={module.id} goalId={goalId} module={module} />
          ))
      ) : (
        <div>No modules available for this goal.</div>
      )}
    </>
  );
};

export default GoalDetails;