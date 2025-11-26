import { GoalType } from '@/lib/types'
import Link from 'next/link'
import React from 'react'

type SingleGoalProps = {
  goal: GoalType,
  setGoals: React.Dispatch<React.SetStateAction<Array<GoalType>>>
}

const SingleGoal = ({ goal, setGoals }: SingleGoalProps) => {
  const deleteGoal = async (id: string) => {
    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Goal deleted successfully');
        setGoals(prevGoals => prevGoals.filter(g => g.id !== id));
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
        <Link href={`/goals/${goal.id}`} className='block bg-gray-700 p-4 rounded-lg shadow-md mb-4 hover:bg-gray-600 transition-colors'>
          <h4 className='text-2xl font-bold capitalize'>{goal.title}</h4>
          <p>{goal.description}</p>
          <button onClick={(e) => { e.preventDefault(); deleteGoal(goal.id); }} className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600 transition-colors">Delete goal</button>
        </Link>
      )}
    </>
  )
}

export default SingleGoal