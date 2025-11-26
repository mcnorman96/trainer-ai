import SingleGoal from './SingleGoal';
import { getListOfGoals } from '../actions';
import { GoalType } from '@/lib/types';

// Server Component for server-side caching
const ListOfGoals = async () => {
  const goals: Array<GoalType> = await getListOfGoals();

  return (
    <div className="w-full bg-gray-800 rounded-lg shadow p-6 border border-gray-700 mt-6">
      <h3 className="mb-6 text-white">List Of Goals</h3>
      <div className="space-y-6">
        {goals && goals.map((goal) => (
          <SingleGoal key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
};

export default ListOfGoals;