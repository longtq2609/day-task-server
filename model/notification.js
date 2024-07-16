const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  link: String,
  type: { type: String, enum: ['task_update', 'message', 'other'] },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;