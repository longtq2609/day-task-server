const mongoose = require('mongoose');

const groupMemberSchema = new mongoose.Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'TaskGroup', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  joinedAt: { type: Date, default: Date.now }
});

const GroupMember = mongoose.model('GroupMember', groupMemberSchema);

module.exports = GroupMember;