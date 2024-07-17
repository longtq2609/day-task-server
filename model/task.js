const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['not_started', 'in_progress', 'completed'], default: 'not_started' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  due_date: Date,
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignee_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' } ,// Trường mới
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },

});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;