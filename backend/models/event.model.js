const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
  title: {type: String, required: true},
  location: {type: String},
  time: {type: String},
  date: {type: Date},
  relateddiscussions: [{type: String}],
}, {
  timestamps: true
});

const daySchema = new Schema({
  date: {type: Date, required: true},
  activityids: [{type: String}]
}, {
  timestamps: true
});

const editorSchema = new Schema({
  googleId: {type:String, required: true},
  name: {type:String, required: true},
  email: {type:String},
  picture: {type:String},
}, {
  timestamps: true
});

const eventSchema = new Schema({
  owner: { type: String, required: true },
  title: {type: String, required: true},
  editors: [editorSchema],
  itinerary: [daySchema],
  discussion: [String],
  activities: [{type: activitySchema}],
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;