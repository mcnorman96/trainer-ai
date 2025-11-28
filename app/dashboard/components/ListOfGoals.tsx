import SingleGoal from './SingleGoal';
import { getListOfGoals } from '../actions';
import { GoalType } from '@/lib/types';

// Server Component for server-side caching
const ListOfGoals = async () => {
  const goals: Array<GoalType> = await getListOfGoals();

  return (
    <div className="w-full bg-gray-800 rounded-lg shadow p-4 sm:p-6 border border-gray-700 mt-4 sm:mt-6">
      <h3 className="mb-4 sm:mb-6 text-white text-base sm:text-lg">List Of Goals</h3>
      <div className="space-y-4 sm:space-y-6">
        {goals && goals.length > 0 ? goals.map((goal) => (
          <SingleGoal key={goal.id} goal={goal} />
        )) : <p className="text-gray-400">No goals yet.</p>}
      </div>
    </div>
  );
};

export default ListOfGoals;