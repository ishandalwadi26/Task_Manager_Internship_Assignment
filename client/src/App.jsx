import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:5000/api/tasks'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('General')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editDueDate, setEditDueDate] = useState('')
  const [editCategory, setEditCategory] = useState('General')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const categories = ['General', 'Work', 'Personal', 'Shopping', 'Health', 'Other']

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setTasks(data)
    } catch (err) {
      setError('Failed to fetch tasks')
    }
  }

  const clearMessages = () => {
    setTimeout(() => {
      setError('')
      setSuccess('')
    }, 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setError('Task title is required')
      clearMessages()
      return
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          dueDate: dueDate || null,
          category
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create task')
      } else {
        setTasks([data, ...tasks])
        setTitle('')
        setDescription('')
        setDueDate('')
        setCategory('General')
        setSuccess('Task created successfully!')
      }
      clearMessages()
    } catch (err) {
      setError('Failed to create task')
      clearMessages()
    }
  }

  const handleComplete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}/complete`, {
        method: 'PATCH'
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to complete task')
      } else {
        setTasks(tasks.map(task =>
          task._id === id ? { ...task, completed: true } : task
        ))
        setSuccess('Task marked as completed!')
      }
      clearMessages()
    } catch (err) {
      setError('Failed to complete task')
      clearMessages()
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Failed to delete task')
      } else {
        setTasks(tasks.filter(task => task._id !== id))
        setSuccess('Task deleted successfully!')
      }
      clearMessages()
    } catch (err) {
      setError('Failed to delete task')
      clearMessages()
    }
  }

  const handleEdit = (task) => {
    setEditingId(task._id)
    setEditTitle(task.title)
    setEditDescription(task.description || '')
    setEditDueDate(task.dueDate ? task.dueDate.split('T')[0] : '')
    setEditCategory(task.category || 'General')
  }

  const handleUpdate = async (id) => {
    if (!editTitle.trim()) {
      setError('Task title is required')
      clearMessages()
      return
    }

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          dueDate: editDueDate || null,
          category: editCategory
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to update task')
      } else {
        setTasks(tasks.map(task =>
          task._id === id ? data : task
        ))
        setEditingId(null)
        setSuccess('Task updated successfully!')
      }
      clearMessages()
    } catch (err) {
      setError('Failed to update task')
      clearMessages()
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const getCompletedCount = () => tasks.filter(t => t.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">
            {tasks.length} total | {getCompletedCount()} completed | {tasks.length - getCompletedCount()} pending
          </p>
        </header>

        {/* Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        {/* Create Task Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition duration-200"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
          {tasks.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
              <p>No tasks yet. Create your first task above!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className={`bg-white rounded-xl shadow p-6 transition duration-200 ${
                  task.completed ? 'opacity-75' : ''
                }`}
              >
                {editingId === task._id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title *
                        </label>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        rows="2"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(task._id)}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            task.category === 'Work' ? 'bg-blue-100 text-blue-800' :
                            task.category === 'Personal' ? 'bg-green-100 text-green-800' :
                            task.category === 'Shopping' ? 'bg-yellow-100 text-yellow-800' :
                            task.category === 'Health' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {task.category}
                          </span>
                          {task.dueDate && (
                            <span className="text-xs text-gray-500">
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <h3 className={`text-lg font-semibold ${
                          task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                        }`}>
                          {task.title}
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        {!task.completed && (
                          <button
                            onClick={() => handleComplete(task._id)}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
                          >
                            Complete
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(task)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {task.description && (
                      <p className={`text-gray-600 ${
                        task.completed ? 'line-through' : ''
                      }`}>
                        {task.description}
                      </p>
                    )}
                    <div className="mt-2 text-xs text-gray-400">
                      Created: {new Date(task.createdAt).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
