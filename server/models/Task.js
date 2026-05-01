const mongoose = require('mongoose');

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
    default: 'General',
    enum: ['General', 'Work', 'Personal', 'Shopping', 'Health', 'Other']
  }
}, {
  timestamps: true
});

// Index for faster queries
taskSchema.index({ createdAt: -1 });
taskSchema.index({ completed: 1 });
taskSchema.index({ category: 1 });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
