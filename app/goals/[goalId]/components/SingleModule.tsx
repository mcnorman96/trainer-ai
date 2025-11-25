import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/apiFetch';

const SingleModule = ({ goalId, module }: any) => {
  const [open, setOpen] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(module.completed ?? false);
  const [lessonCompleted, setLessonCompleted] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    module.lessons?.forEach((lesson: any) => {
      initial[lesson.id] = lesson.completed ?? false;
    });
    return initial;
  });

  // Refresh completion status from DB when module/lessons change
  useEffect(() => {
    setModuleCompleted(module.completed ?? false);
    setLessonCompleted(() => {
      const initial: Record<string, boolean> = {};
      module.lessons?.forEach((lesson: any) => {
        initial[lesson.id] = lesson.completed ?? false;
      });
      return initial;
    });
  }, [module]);

  return (
    <div className="border rounded-lg p-4 mb-4 bg-gray-700">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpen(!open)}>
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            {module.title}
            {moduleCompleted && <span className="ml-2 px-2 py-1 text-xs bg-green-200 text-green-800 rounded">Completed</span>}
          </h3>
          <p className="mb-2 text-white">{module.description}</p>
        </div>
        <button
          aria-label={open ? 'Hide lessons' : 'Show lessons'}
          className="ml-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
        >
          {open ? (
            <span className="transition-transform duration-200 text-black">▲</span>
          ) : (
            <span className="transition-transform duration-200 text-black">▼</span>
          )}
        </button>
      </div>
      {open && (
        <div className="ml-4 mt-2">
          {module.lessons && module.lessons.length > 0 ? (
            module.lessons.map((lesson: any) => (
              <div key={lesson.id} className="mb-2 p-2 border-b last:border-b-0 flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium">
                    <Link href={`/goals/${goalId}/lessons/${lesson.id}`} className="hover:underline text-blue-300">
                      {lesson.title}
                      {lessonCompleted[lesson.id] && <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Done</span>}
                    </Link>
                  </h4>
                  <p className="text-white">{lesson.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No lessons available for this module.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleModule;