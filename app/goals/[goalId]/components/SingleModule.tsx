import { LessonType, ModuleType } from '@/lib/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SingleModule = ({ goalId, module }: { goalId: string; module: ModuleType }) => {
  const [open, setOpen] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(module.completed ?? false);
  const [lessonCompleted, setLessonCompleted] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    module.lessons?.forEach((lesson: LessonType) => {
      initial[lesson.id] = lesson.completed ?? false;
    });
    return initial;
  });

  useEffect(() => {
    const checkCompleteStatus = () => {
      setModuleCompleted((prev) => {
        const next = module.completed ?? false;
        return prev !== next ? next : prev;
      });

      setLessonCompleted(() => {
        const initial: Record<string, boolean> = {};
        module.lessons?.forEach((lesson: LessonType) => {
          initial[lesson.id] = lesson.completed ?? false;
        });
        return initial;
      });
    };
    checkCompleteStatus();
  }, [module]);

  return (
    <div className="w-full bg-gray-800 rounded-lg shadow p-4 border border-gray-700">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpen(!open)}>
        <div>
          <h3 className="text-xl font-bold mb-2 flex items-center text-white">
            {module.title}
            {moduleCompleted && <span className="ml-2 px-2 py-1 text-xs bg-green-500 text-white rounded">Completed</span>}
          </h3>
          <p className="mb-2 text-gray-300">{module.description}</p>
        </div>
        <button
          aria-label={open ? 'Hide lessons' : 'Show lessons'}
          className="ml-2 p-2 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none"
        >
          {open ? (
            <span className="transition-transform duration-200 text-white">▲</span>
          ) : (
            <span className="transition-transform duration-200 text-white">▼</span>
          )}
        </button>
      </div>
      {open && (
        <div className="ml-4 mt-4">
          {module.lessons && module.lessons.length > 0 ? (
            <div className="space-y-4">
              {module.lessons.map((lesson: LessonType) => (
                <div key={lesson.id} className="p-3 rounded bg-gray-900 border border-gray-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-300">
                      <Link href={`/goals/${goalId}/lessons/${lesson.id}`} className="hover:underline">
                        {lesson.title}
                        {lessonCompleted[lesson.id] && <span className="ml-2 px-2 py-1 text-xs bg-green-400 text-white rounded">Completed</span>}
                      </Link>
                    </h4>
                    <p className="text-gray-400">{lesson.shortContent}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No lessons available for this module.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleModule;