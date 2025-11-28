'use client'

import { useEffect, useState } from 'react'
import { ModalProvider, useModal } from '@/app/components/ModalContext';
import QuizModal from './QuizModal';
import { LessonType } from '@/lib/types';
import { getLessonForModule } from '../actions';
import ReactMarkdown from 'react-markdown';

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
      {lesson ? (
        <div>
        <div className="prose prose-invert text-gray-300 mb-2 sm:mb-6 overflow-auto">
            <ReactMarkdown>{lesson.content}</ReactMarkdown>
          </div>
          <button
            className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            onClick={openModal}
          >
            Take Quiz
          </button>
          <QuizModal lessonId={lesson.id} moduleId={lesson.moduleId} goalId={goalId} />
        </div>
      ) : (
        <p className="text-gray-400">Loading lesson...</p>
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