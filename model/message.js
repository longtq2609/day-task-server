const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Người nhận
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'TaskGroup' }, // Nhóm (nếu có)
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;