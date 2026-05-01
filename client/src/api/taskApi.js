const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetch all tasks from the API
 * @returns {Promise<Array>} Array of tasks
 */
export const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch tasks');
  }

  return data.data || [];
};

/**
 * Fetch a single task by ID
 * @param {string} id - Task ID
 * @returns {Promise<Object>} Task object
 */
export const fetchTask = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch task');
  }

  return data.data;
};

/**
 * Create a new task
 * @param {Object} taskData - Task data
 * @returns {Promise<Object>} Created task
 */
export const createTask = async (taskData) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to create task');
  }

  return data.data;
};

/**
 * Update an existing task
 * @param {string} id - Task ID
 * @param {Object} taskData - Updated task data
 * @returns {Promise<Object>} Updated task
 */
export const updateTask = async (id, taskData) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to update task');
  }

  return data.data;
};

/**
 * Mark a task as completed
 * @param {string} id - Task ID
 * @returns {Promise<Object>} Updated task
 */
export const completeTask = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}/complete`, {
    method: 'PATCH'
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to complete task');
  }

  return data.data;
};

/**
 * Delete a task
 * @param {string} id - Task ID
 * @returns {Promise<void>}
 */
export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE'
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to delete task');
  }

  return data;
};
