import SingleLesson from './components/SingleLesson';

const lessonIdPage = async({ params }: { params: { goalId: string, lessonId: string } })  => {
  const { goalId, lessonId } = await params;
  
  return (
    <div className="flex flex-col min-h-screen p-2 sm:p-5">
      <SingleLesson goalId={goalId} lessonId={lessonId} />
    </div>
  )
}

export default lessonIdPage