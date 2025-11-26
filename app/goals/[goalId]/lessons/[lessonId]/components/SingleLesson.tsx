'use client'

import { useEffect, useState } from 'react'
import { ModalProvider, useModal } from '@/app/components/ModalContext';
import QuizModal from './QuizModal';
import { LessonType } from '@/lib/types';
import { getLessonForModule } from '../actions';

const SingleLessonContent = ({ goalId, lessonId }: { goalId: string; lessonId: string }) => {
  const [lesson, setLesson] = useState<LessonType | null>(null);
  const { openModal } = useModal();

  useEffect(() => {
    const getLessonData = async (lessonId: string) => {
      try {
        const lesson = await getLessonForModule(lessonId);
        setLesson(lesson);
      } catch (error) {
        console.error('Error fetching lesson data:', error);
      }
    };

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