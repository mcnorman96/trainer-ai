import ListOfGoals from "./components/ListOfGoals";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen p-5">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg mb-8">Overview of your training goals and progress</p>
      <ListOfGoals />
    </div>
  )
}
