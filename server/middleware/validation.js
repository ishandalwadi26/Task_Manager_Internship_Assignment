// @desc    Validate task input
// @param   {Object} req - Request object
// @param   {Object} res - Response object
// @param   {Function} next - Next middleware function
const validateTaskInput = (req, res, next) => {
  const { title } = req.body;

  // Check if title exists
  if (!title) {
    return res.status(400).json({
      success: false,
      error: 'Task title is required'
    });
  }

  // Check if title is empty or whitespace only
  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Task title cannot be empty'
    });
  }

  // Check title length
  if (title.length > 200) {
    return res.status(400).json({
      success: false,
      error: 'Task title must be less than 200 characters'
    });
  }

  // Check description length if provided
  if (req.body.description && req.body.description.length > 1000) {
    return res.status(400).json({
      success: false,
      error: 'Description must be less than 1000 characters'
    });
  }

  // Validate category if provided
  const validCategories = ['General', 'Work', 'Personal', 'Shopping', 'Health', 'Other'];
  if (req.body.category && !validCategories.includes(req.body.category)) {
    return res.status(400).json({
      success: false,
      error: `Invalid category. Must be one of: ${validCategories.join(', ')}`
    });
  }

  // Validate dueDate format if provided
  if (req.body.dueDate) {
    const date = new Date(req.body.dueDate);
    if (isNaN(date.getTime())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid due date format'
      });
    }
  }

  next();
};

module.exports = { validateTaskInput };
