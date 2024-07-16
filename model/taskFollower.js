const mongoose = require('mongoose');

const taskFollowerSchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const TaskFollower = mongoose.model('TaskFollower', taskFollowerSchema);

module.exports = TaskFollower;