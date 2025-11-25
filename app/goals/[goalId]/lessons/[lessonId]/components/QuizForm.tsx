import React, { useState } from 'react';
import { apiFetch } from '@/lib/apiFetch';

interface QuizFormProps {
  quiz: { questions: Array<{ question: string; options: string[]; answer: string }> };
  onClose: () => void;
  lessonId: string;
  moduleId: string;
  onSuccess?: () => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ quiz, onClose, lessonId, moduleId, onSuccess }) => {
  const [selected, setSelected] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleChange = (qIdx: number, opt: string) => {
    setSelected((prev) => ({ ...prev, [qIdx]: opt }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      if (selected[idx] === q.answer) correct++;
    });
    const percent = (correct / quiz.questions.length) * 100;
    setScore(correct);
    setSubmitted(true);
    
    if (percent >= 75) {
      // Mark lesson as completed in DB
      await apiFetch(`/api/lessons/${lessonId}/complete`, { method: 'POST' });
      // Check if all lessons in module are completed, mark module as completed if so
      await apiFetch(`/api/modules/${moduleId}/check-complete`, { method: 'POST' });
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {quiz.questions.map((q, idx) => (
        <div key={idx} className="mb-4">
          <p className="font-semibold mb-2">{q.question}</p>
          <div className="flex flex-col gap-2">
            {q.options.map((opt, i) => (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected[idx] === opt}
                  onChange={() => handleChange(idx, opt)}
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
        <div className="mt-4 text-lg font-bold text-white">Score: {score} / {quiz.questions.length}</div>
      )}
      <button type="button" onClick={onClose} className="mt-4 ml-2 px-4 py-2 bg-white text-gray-800 rounded">Close</button>
    </form>
  );
};

export default QuizForm;