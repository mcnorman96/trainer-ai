"use client";
import { useRef, useState } from "react";
import { apiFetch } from "@/lib/apiFetch";

export default function GoalInput() {
  const goalInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [createdGoal, setCreatedGoal] = useState<string | null>(null);

  const createGoal = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    const title = goalInputRef.current?.value;

    if (title) {
      try {
        const data = await apiFetch("/api/goals", {
          method: "POST",
          body: { title },
        });
        
        if (data.success) {
          setSuccess("Goal created!");
          setCreatedGoal(data.fullLearningPath.goal.title);
          if (goalInputRef.current) {
            goalInputRef.current.value = "";
          }
        } else {
          setError(data.error || "Failed to create goal");
        }

      } catch (err) {
        setError("Network error");
        console.log('err', err);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <input className="border p-2 rounded w-1/2 mb-4" ref={goalInputRef} type="text" placeholder="Enter your training goal" />
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={createGoal} disabled={loading}>
        {loading ? "Creating..." : "Create Goal"}
      </button>
      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>}
      {createdGoal && <p>Last created goal: {createdGoal}</p>}
    </>
  );
}