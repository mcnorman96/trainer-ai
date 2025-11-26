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
    <div className="w-full bg-gray-900 rounded-xl shadow-lg p-6 mt-10 border border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-white">Lesson Details</h2>
      {lesson ? (
        <div>
          <h3 className="text-xl font-semibold text-blue-300 mb-2">{lesson.title}</h3>
          <div className="prose prose-invert text-gray-300 mb-6">
            <ReactMarkdown>{lesson.content}</ReactMarkdown>
          </div>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            onClick={openModal}
          >
            Take Quiz
          </button>
          <QuizModal lessonId={lesson.id} moduleId={lesson.moduleId} goalId={goalId} />
        </div>
      ) : (
        <p className="text-gray-400">Loading lesson...</p>
      )}
    </div>
  );
};

const SingleLesson = (props: { goalId: string; lessonId: string }) => (
  <ModalProvider>
    <SingleLessonContent {...props} />
  </ModalProvider>
);

export default SingleLesson;