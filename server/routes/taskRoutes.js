const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  completeTask,
  deleteTask
} = require('../controllers/taskController');
const { validateTaskInput } = require('../middleware/validation');

// Re-route into other resource routes
router.route('/')
  .get(getTasks)
  .post(validateTaskInput, createTask);

router.route('/:id')
  .get(getTask)
  .put(validateTaskInput, updateTask)
  .delete(deleteTask);

router.route('/:id/complete')
  .patch(completeTask);

module.exports = router;
