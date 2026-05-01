const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/task-manager';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Task Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    minlength: [1, 'Task title cannot be empty']
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date,
    default: null
  },
  category: {
    type: String,
    default: 'General'
  }
}, {
  timestamps: true
});

// Task Model
const Task = mongoose.model('Task', taskSchema);

// Validation middleware
const validateTask = (req, res, next) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Task title is required and cannot be empty' });
  }

  next();
};

// Routes

// GET all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: error.message });
  }
});

// GET single task
app.get('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(500).json({ error: 'Failed to fetch task', details: error.message });
  }
});

// POST create task
app.post('/api/tasks', validateTask, async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description || '',
      dueDate: req.body.dueDate || null,
      category: req.body.category || 'General'
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    res.status(500).json({ error: 'Failed to create task', details: error.message });
  }
});

// PUT update task
app.put('/api/tasks/:id', validateTask, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        category: req.body.category
      },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    res.status(500).json({ error: 'Failed to update task', details: error.message });
  }
});

// PATCH mark as completed
app.patch('/api/tasks/:id/complete', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.completed) {
      return res.status(400).json({ error: 'Task is already marked as completed' });
    }

    task.completed = true;
    await task.save();

    res.json(task);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(500).json({ error: 'Failed to complete task', details: error.message });
  }
});

// DELETE task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(500).json({ error: 'Failed to delete task', details: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
