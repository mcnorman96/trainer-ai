'use client'

import React, { useEffect } from 'react';
import SingleGoal from './SingleGoal';
import { apiFetch } from '../../../lib/apiFetch';

const ListOfGoals = () => {
  const [goals, setGoals] = React.useState<Array<{id: string, title: string, description: string}>>([])
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await apiFetch<{ listOfGoal: Array<{id: string, title: string, description: string}> }>('/api/goals');
        setGoals(data.listOfGoal);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };
    fetchGoals();
  }, []);

  return (
    <div className='goals'>
      <h2 className='text-2xl font-bold mb-4'>List Of Goals</h2>
      <div className='flex flex-col'>
      {
        goals && goals.map((goal) => (
          <div key={goal.id}>
            <SingleGoal goal={goal} setGoals={setGoals} />
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default ListOfGoals