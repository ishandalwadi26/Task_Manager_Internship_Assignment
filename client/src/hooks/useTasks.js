import { useState, useEffect, useCallback } from 'react';
import * as taskApi from '../api/taskApi';

/**
 * Custom hook for managing tasks
 * @returns {Object} Tasks state and actions
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch all tasks
   */
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await taskApi.fetchTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new task
   * @param {Object} taskData - Task data
   */
  const createTask = async (taskData) => {
    try {
      const newTask = await taskApi.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      return { success: true, data: newTask };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  /**
   * Update an existing task
   * @param {string} id - Task ID
   * @param {Object} taskData - Updated task data
   */
  const updateTask = async (id, taskData) => {
    try {
      const updatedTask = await taskApi.updateTask(id, taskData);
      setTasks(prev => prev.map(task =>
        task._id === id ? updatedTask : task
      ));
      return { success: true, data: updatedTask };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  /**
   * Mark a task as completed
   * @param {string} id - Task ID
   */
  const completeTask = async (id) => {
    try {
      const updatedTask = await taskApi.completeTask(id);
      setTasks(prev => prev.map(task =>
        task._id === id ? updatedTask : task
      ));
      return { success: true, data: updatedTask };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  /**
   * Delete a task
   * @param {string} id - Task ID
   */
  const deleteTask = async (id) => {
    try {
      await taskApi.deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Get task statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  };

  return {
    tasks,
    loading,
    error,
    stats,
    createTask,
    updateTask,
    completeTask,
    deleteTask,
    refresh: fetchTasks
  };
};
