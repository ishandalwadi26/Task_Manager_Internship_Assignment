import TaskItem from './TaskItem';

/**
 * TaskList Component
 * @param {Object} props
 * @param {Array} props.tasks - Array of tasks
 * @param {Function} props.onComplete - Complete handler
 * @param {Function} props.onUpdate - Update handler
 * @param {Function} props.onDelete - Delete handler
 */
const TaskList = ({ tasks, onComplete, onUpdate, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="text-gray-500">No tasks yet. Create your first task above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onComplete={onComplete}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
