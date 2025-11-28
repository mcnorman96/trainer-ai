import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { QuizType } from '@/lib/types';
import { checkAndMarkModuleComplete, markLessonComplete } from '../actions';

interface QuizFormProps {
  quiz: QuizType;
  onClose: () => void;
  lessonId: string;
  moduleId: string;
  onSuccess?: () => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ quiz, onClose, lessonId, moduleId, onSuccess }) => {
  const [selected, setSelected] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<string | null>(null);

  const handleChange = (qId: number, opt: string) => {
    setSelected((prev) => ({ ...prev, [qId]: opt }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let correct = 0;

    quiz.questions.forEach((quizQuestion, id) => {
      if (selected[id] === quizQuestion.answer) correct++;
    });

    const percent = (correct / quiz.questions.length) * 100;
    setScore(`${percent.toFixed(2)}%`);
    setSubmitted(true);
    
    if (percent >= 75) {
      await markLessonComplete(lessonId);
      await checkAndMarkModuleComplete(moduleId);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {quiz.questions.map((quizQuestion, id) => (
        <div key={id} className="mb-2 sm:mb-4 p-2 sm:p-4 bg-gray-800 rounded-lg border border-gray-700">
          <div className="font-semibold mb-1 sm:mb-2 text-white">
            <ReactMarkdown>{quizQuestion.question}</ReactMarkdown>
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            {quizQuestion.options.map((opt, i) => (
              <label key={i} className="flex items-center gap-2 cursor-pointer mb-0">
                <input
                  type="checkbox"
                  checked={selected[id] === opt}
                  onChange={() => handleChange(id, opt)}
                  disabled={submitted}
                  className="form-checkbox h-5 w-5 text-blue-500 focus:ring-2 focus:ring-blue-400"
                />
                <span className="text-gray-200 text-sm sm:text-base mb-0">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      {!submitted ? (
        <button type="submit" className="w-full mt-4 mb-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">Submit</button>
      ) : (
          <>
            <div className="mt-4 mb-2 text-lg font-bold text-blue-400">Score: {score}</div>
            {score && parseFloat(score) >= 75 ? (
              <div className="text-green-400 font-semibold">Congratulations! You passed the quiz.</div>
              
            ) : (
              <div className="text-red-400 font-semibold">You did not pass. Please try again.</div>
            )}
            {onSuccess && <button type="button" onClick={onSuccess} className="w-full mt-2 mb-2 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition">Proceed</button>}
          </>

      )}
      <button type="button" onClick={onClose} className="w-full mt-2 px-6 py-2 bg-gray-700 text-white rounded-lg font-semibold shadow hover:bg-gray-600 transition">Close</button>
    </form>
  );
};

export default QuizForm;