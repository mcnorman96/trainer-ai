import PageLayout from "../components/PageLayout";
import ListOfGoals from "./components/ListOfGoals";

export default function DashboardPage() {
  return (
    <PageLayout title="Dashboard">
        <p className="text-base sm:text-lg mb-4 sm:mb-8 text-gray-300">Overview of your training goals and progress</p>
        <ListOfGoals />
    </PageLayout>
  )
}
