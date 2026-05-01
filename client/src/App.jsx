import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import { TaskForm, TaskList, TaskStats } from './components/tasks';
import { Alert } from './components/ui';
import './App.css';

function App() {
  const {
    tasks,
    loading,
    error: fetchError,
    stats,
    createTask,
    updateTask,
    completeTask,
    deleteTask
  } = useTasks();

  const [alert, setAlert] = useState({ type: '', message: '', show: false });

  const showAlert = (type, message) => {
    setAlert({ type, message, show: true });
    setTimeout(() => {
      setAlert({ type: '', message: '', show: false });
    }, 3000);
  };

  const handleCreate = async (taskData) => {
    const result = await createTask(taskData);
    if (result.success) {
      showAlert('success', 'Task created successfully!');
    } else {
      showAlert('error', result.error);
    }
  };

  const handleUpdate = async (id, taskData) => {
    const result = await updateTask(id, taskData);
    if (result.success) {
      showAlert('success', 'Task updated successfully!');
    } else {
      showAlert('error', result.error);
    }
    return result;
  };

  const handleComplete = async (id) => {
    const result = await completeTask(id);
    if (result.success) {
      showAlert('success', 'Task marked as completed!');
    } else {
      showAlert('error', result.error);
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteTask(id);
    if (result.success) {
      showAlert('success', 'Task deleted successfully!');
    } else {
      showAlert('error', result.error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">
            Organize your tasks efficiently
          </p>
        </header>

        {/* Alert Messages */}
        <Alert
          type={alert.type}
          message={alert.message}
          show={alert.show}
          onClose={() => setAlert({ ...alert, show: false })}
        />

        {fetchError && (
          <Alert
            type="error"
            message={fetchError}
            show={true}
          />
        )}

        {/* Statistics */}
        <TaskStats stats={stats} />

        {/* Create Task Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Create New Task
          </h2>
          <TaskForm onSubmit={handleCreate} />
        </div>

        {/* Tasks List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Tasks
          </h2>
          <TaskList
            tasks={tasks}
            onComplete={handleComplete}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
