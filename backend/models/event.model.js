const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
  title: {type: String, required: true},
  location: {type: String},
  time: {type: String},
  date: {type:String},
  relateddiscussions: [{type: String}],
}, {
  timestamps: true
});

const daySchema = new Schema({
  date: {type: String, required: true},
  activityids: [{type: String}]
}, {
  timestamps: true
});

const eventSchema = new Schema({
  owner: { type: String, required: true },
  title: {type: String, required: true},
  editors: [{ type: String}],
  itinerary: [daySchema],
  discussion: [String],
  activities: [{type: activitySchema}],
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;