const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: {type: String, required: true},
  author: {type: String, required: true},
  chatroom: {type: String, required: true},
  time: {type: String, required: true},
}, {
  timestamps: true
});

const chatLogSchema = new Schema({
  messages: [{ type: messageSchema}],
  activityid: {type: String},
  activityname: {type: String}
}, {
  timestamps: true,
});

const ChatLog = mongoose.model('ChatLog', chatLogSchema);
module.exports = ChatLog;