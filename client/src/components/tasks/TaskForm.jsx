import { useState } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const CATEGORIES = [
  { value: 'General', label: 'General' },
  { value: 'Work', label: 'Work' },
  { value: 'Personal', label: 'Personal' },
  { value: 'Shopping', label: 'Shopping' },
  { value: 'Health', label: 'Health' },
  { value: 'Other', label: 'Other' }
];

/**
 * TaskForm Component
 * @param {Object} props
 * @param {Function} props.onSubmit - Submit handler
 * @param {Object} props.initialData - Initial form data (for edit mode)
 * @param {boolean} props.isEditing - Edit mode flag
 * @param {Function} props.onCancel - Cancel handler (for edit mode)
 */
const TaskForm = ({ onSubmit, initialData, isEditing = false, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || 'General',
    dueDate: initialData?.dueDate
      ? new Date(initialData.dueDate).toISOString().split('T')[0]
      : ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      ...formData,
      dueDate: formData.dueDate || null
    });

    // Reset form if not in edit mode
    if (!isEditing) {
      setFormData({
        title: '',
        description: '',
        category: 'General',
        dueDate: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          type="text"
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
          error={errors.title}
        />
        <Select
          name="category"
          label="Category"
          value={formData.category}
          onChange={handleChange}
          options={CATEGORIES}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows="3"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <Input
        type="date"
        name="dueDate"
        label="Due Date"
        value={formData.dueDate}
        onChange={handleChange}
      />

      <div className="flex gap-2">
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
        >
          {isEditing ? 'Update Task' : 'Add Task'}
        </Button>
        {isEditing && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
