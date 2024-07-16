const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['not_started', 'in_progress', 'completed'], default: 'not_started' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;