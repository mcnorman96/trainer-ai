'use client'

import { apiFetch } from '@/lib/apiFetch'
import { useEffect, useState } from 'react'
import { ModalProvider, useModal } from '@/app/components/ModalContext';
import QuizModal from './QuizModal';

const SingleLessonContent = ({ goalId, lessonId }: { goalId: string; lessonId: string }) => {
  const [lesson, setLesson] = useState<{ id: string; title: string; content: string; order: number; moduleId?: string } | null>(null);
  const { openModal } = useModal();

  const getLessonData = async (lessonId: string) => {
    try {
      const data = await apiFetch(`/api/lessons?lessonId=${lessonId}`);
      
      if (data.success) {
        setLesson(data.lesson);
      }
    } catch (error) {
      console.error('Error fetching lesson data:', error);
    }
  };

  useEffect(() => {
    getLessonData(lessonId);
  }, [lessonId]);

  return (
    <>
      <h2>Lesson Details</h2>
      {lesson ? (
        <div>
          <h3>{lesson.title}</h3>
          <p>{lesson.content}</p>
          <button
            className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={openModal}
          >
            Take Quiz
          </button>
          <QuizModal lessonId={lesson.id} moduleId={lesson.moduleId} goalId={goalId} />
        </div>
      ) : (
        <p>Loading lesson...</p>
      )}
    </>
  );
};

const SingleLesson = (props: { goalId: string; lessonId: string }) => (
  <ModalProvider>
    <SingleLessonContent {...props} />
  </ModalProvider>
);

export default SingleLesson;