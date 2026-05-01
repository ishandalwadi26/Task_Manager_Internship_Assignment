import { useState } from 'react';
import Button from '../ui/Button';
import TaskForm from './TaskForm';

const CATEGORY_COLORS = {
  General: 'bg-gray-100 text-gray-800',
  Work: 'bg-blue-100 text-blue-800',
  Personal: 'bg-green-100 text-green-800',
  Shopping: 'bg-yellow-100 text-yellow-800',
  Health: 'bg-red-100 text-red-800',
  Other: 'bg-purple-100 text-purple-800'
};

/**
 * TaskItem Component
 * @param {Object} props
 * @param {Object} props.task - Task object
 * @param {Function} props.onComplete - Complete handler
 * @param {Function} props.onUpdate - Update handler
 * @param {Function} props.onDelete - Delete handler
 */
const TaskItem = ({ task, onComplete, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (updatedData) => {
    const result = await onUpdate(task._id, updatedData);
    if (result.success) {
      setIsEditing(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Task</h3>
        <TaskForm
          initialData={task}
          isEditing
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow p-6 transition-all duration-200 ${
      task.completed ? 'opacity-75 bg-gray-50' : 'hover:shadow-lg'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`px-2 py-1 text-xs rounded-full ${
              CATEGORY_COLORS[task.category] || CATEGORY_COLORS.General
            }`}>
              {task.category}
            </span>
            {task.dueDate && (
              <span className="text-xs text-gray-500">
                Due: {formatDate(task.dueDate)}
              </span>
            )}
          </div>
          <h3 className={`text-lg font-semibold ${
            task.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}>
            {task.title}
          </h3>
        </div>
        <div className="flex gap-2 flex-shrink-0 ml-4">
          {!task.completed && (
            <Button
              variant="success"
              size="sm"
              onClick={() => onComplete(task._id)}
            >
              Complete
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(task._id)}
          >
            Delete
          </Button>
        </div>
      </div>

      {task.description && (
        <p className={`text-gray-600 mb-2 ${
          task.completed ? 'line-through' : ''
        }`}>
          {task.description}
        </p>
      )}

      <div className="text-xs text-gray-400">
        Created: {formatDateTime(task.createdAt)}
      </div>
    </div>
  );
};

export default TaskItem;
