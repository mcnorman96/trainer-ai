import GoalDetails from "./components/GoalDetails";
import PageLayout from "@/app/components/PageLayout";

export default async function GoalDetailPage({ params }: { params: { goalId: string } }) {
  const { goalId } = await params;
  return (
    <PageLayout title="Learning Path for Goal">
      <GoalDetails goalId={goalId} />
    </PageLayout>
  )
}
