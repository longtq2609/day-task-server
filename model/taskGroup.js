const mongoose = require('mongoose');

const taskGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] // Các task thuộc nhóm
});

const TaskGroup = mongoose.model('TaskGroup', taskGroupSchema);

module.exports = TaskGroup;