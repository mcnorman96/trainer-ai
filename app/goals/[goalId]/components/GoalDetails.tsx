'use client';

import { apiFetch } from "@/lib/apiFetch";
import React, { useEffect } from "react";
import SingleModule from "./SingleModule";

interface Module {
  id: string;
  title: string;
  description?: string;
}

interface GoalDetailsProps {
  goalId: string;
}

const GoalDetails: React.FC<GoalDetailsProps> = ({ goalId }) => {
  const [modules, setModules] = React.useState<Module[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const getGoalModules = async () => {
      try {
        const data = await apiFetch<{ success: boolean; modules: Module[]; error?: string }>(`/api/modules?goalId=${goalId}`);
        if (data.success) {
          setModules(data.modules);
        } else {
          setError(data.error || "Failed to fetch modules");
        }
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