"use client";
import { useRef, useState } from "react";
import { createNewGoal } from "../actions";

export default function GoalInput() {
  const goalInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [createdGoal, setCreatedGoal] = useState<string | null>(null);

  const createGoal = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    const title = goalInputRef.current?.value;
    if (!title) {
      setLoading(false);
      setError("Please enter a goal title");
      return;
    }

    try {
      const data = await createNewGoal(title);
      setSuccess("Goal created!");
      setCreatedGoal(data.goal.title);
      if (goalInputRef.current) {
        goalInputRef.current.value = "";
      }
    } catch (err) {
      setError("Error creating goal");
      console.log('err', err);
    } finally {
      setLoading(false);
    }
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