import React, { useState } from 'react';
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
      if (selected[id] === quizQuestion.correctAnswer) correct++;
    });

    const percent = (correct / quiz.questions.length) * 100;
    setScore(`${percent.toFixed(2)}%`);
    setSubmitted(true);
    
    if (percent >= 75) {
      await markLessonComplete(lessonId);
      await checkAndMarkModuleComplete(moduleId);
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {quiz.questions.map((quizQuestion, id) => (
        <div key={id} className="mb-4">
          <p className="font-semibold mb-2">{quizQuestion.question}</p>
          <div className="flex flex-col gap-2">
            {quizQuestion.options.map((opt, i) => (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected[id] === opt}
                  onChange={() => handleChange(id, opt)}
                  disabled={submitted}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      {!submitted ? (
        <button type="submit" className="mt-4 px-4 py-2 bg-green-600 text-white rounded">Submit</button>
      ) : (
        <div className="mt-4 text-lg font-bold text-white">Score: {score}</div>
      )}
      <button type="button" onClick={onClose} className="mt-4 ml-2 px-4 py-2 bg-white text-gray-800 rounded">Close</button>
    </form>
  );
};

export default QuizForm;