import PageLayout from '@/app/components/PageLayout';
import SingleLesson from './components/SingleLesson';

const lessonIdPage = async({ params }: { params: { goalId: string, lessonId: string } })  => {
  const { goalId, lessonId } = await params;
  
  return (
    <PageLayout title="Lesson Details">
      <SingleLesson goalId={goalId} lessonId={lessonId} />
    </PageLayout>
  )
}

export default lessonIdPage