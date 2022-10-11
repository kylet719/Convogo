const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  oEventsInProgress: [String],
  oEventsDone: [String],
  pEventsInProgress: [String],
  pEventsDone: [String],
  name: String,
  googleId: String
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;