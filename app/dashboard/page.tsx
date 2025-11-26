import ListOfGoals from "./components/ListOfGoals";

export default function DashboardPage() {
  return (
    <div className="w-full bg-gray-900 rounded-xl shadow-lg p-8 mt-10 border border-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-white">Dashboard</h1>
      <p className="text-lg mb-8 text-gray-300">Overview of your training goals and progress</p>
      <ListOfGoals />
    </div>
  )
}
