"use client";

import { GoalType } from '@/lib/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

type SingleGoalProps = {
  goal: GoalType
}

const SingleGoal = ({ goal }: SingleGoalProps) => {
  const router = useRouter();
  const deleteGoal = async (id: string) => {
    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      } else {
        console.error('Failed to delete goal');
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  }

  return (
    <>
      { goal && (
        <div className="bg-gray-900 rounded-lg shadow p-6 border border-gray-800 hover:bg-gray-950 transition-colors">
          <Link href={`/goals/${goal.id}`} className="block">
            <h4 className="text-2xl font-bold capitalize text-blue-300 mb-2">{goal.title}</h4>
            <p className="text-gray-300 mb-4">{goal.description}</p>
          </Link>
          <Link
            href={`/goals/${goal.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition mr-5"
          >
            View goal
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteGoal(goal.id);
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition"
          >
            Delete goal
          </button>
        </div>
      )}
    </>
  )
}

export default SingleGoal