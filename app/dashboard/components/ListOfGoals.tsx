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