"use client";
import { useRef, useState } from "react";
import { createNewGoal } from "../actions";

export default function GoalInput() {
  const goalInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [createdGoal, setCreatedGoal] = useState<string | null>(null);

  const createGoal = async () => {
    setLoading(true);
    setError("");

    const title = goalInputRef.current?.value;
    if (!title) {
      setLoading(false);
      setError("Please enter a goal title");
      return;
    }

    try {
      const data = await createNewGoal(title);
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
    <div className="w-full max-w-xl mx-auto bg-gray-900 rounded-xl shadow-lg p-4 sm:p-8 mt-4 sm:mt-5 border border-gray-800">
      <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Create a New Training Goal</h2>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
        <input
          className="flex-1 px-2 sm:px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          ref={goalInputRef}
          type="text"
          placeholder="Enter your training goal"
        />
        <button
          className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50"
          onClick={createGoal}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Goal"}
        </button>
      </div>
      {error && <p className="text-red-400 font-medium mb-2">{error}</p>}
      {createdGoal && <p className="text-gray-300 mt-2 sm:mt-4">Goal created: <span className="font-semibold">{createdGoal}</span></p>}
    </div>
  );
}