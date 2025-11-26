'use client'

import { useEffect, useState } from 'react';
import SingleGoal from './SingleGoal';
import { getListOfGoals } from '../actions';
import { GoalType } from '@/lib/types';

const ListOfGoals = () => {
  const [goals, setGoals] = useState<Array<GoalType>>([])
  
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const listOfGoal = await getListOfGoals();
        setGoals(listOfGoal || []);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };
    fetchGoals();
  }, [setGoals]);

  return (
    <div className="w-full bg-gray-800 rounded-lg shadow p-6 border border-gray-700 mt-6">
      <h3 className="mb-6 text-white">List Of Goals</h3>
      <div className="space-y-6">
        {goals && goals.map((goal) => (
          <SingleGoal key={goal.id} goal={goal} setGoals={setGoals} />
        ))}
      </div>
    </div>
  )
}

export default ListOfGoals