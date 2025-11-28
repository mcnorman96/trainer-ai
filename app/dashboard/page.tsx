import ListOfGoals from "./components/ListOfGoals";

export default function DashboardPage() {
  return (
    <div className="w-full bg-gray-900 rounded-xl shadow-lg p-4 sm:p-8 mt-6 sm:mt-10 border border-gray-800">
      <h1 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4 text-white">Dashboard</h1>
      <p className="text-base sm:text-lg mb-4 sm:mb-8 text-gray-300">Overview of your training goals and progress</p>
      <ListOfGoals />
    </div>
  )
}
