import GoalDetails from "./components/GoalDetails";

export default async function GoalDetailPage({ params }: { params: { goalId: string } }) {
  const { goalId } = await params;
  return (
    <div className="flex flex-col min-h-screen p-5">
      <GoalDetails goalId={goalId} />
    </div>
  )
}
