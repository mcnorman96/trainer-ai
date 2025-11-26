import { useModal } from '@/app/components/ModalContext';
import { useEffect, useState } from 'react';
import QuizForm from './QuizForm';
import { useRouter } from 'next/navigation';
import { QuizType } from '@/lib/types';
import { getQuizForLesson } from '../actions';

const QuizModal = ({ lessonId, moduleId, goalId }: { lessonId: string; moduleId: string; goalId: string }) => {
  const { isOpen, closeModal } = useModal();
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quiz = await getQuizForLesson(lessonId);
        setQuiz(quiz);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    
    if (isOpen) {
      fetchQuiz();
    }
  }, [isOpen, lessonId]);

  const handleSuccess = () => {
    closeModal();
    router.push(`/goals/${goalId}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-800">
        <h3 className="text-2xl font-bold mb-6 text-white">Quiz</h3>
        {quiz ? (
          <QuizForm quiz={quiz} onClose={closeModal} lessonId={lessonId} moduleId={moduleId} onSuccess={handleSuccess} />
        ) : (
          <p className="text-gray-400">No quiz available.</p>
        )}
      </div>
    </div>
  );
};

export default QuizModal;
