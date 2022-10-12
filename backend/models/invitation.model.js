const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inviteSchema = new Schema({
    senderEmail: {type: String, required: true},
    senderPic: {type: String, required: true},
    senderName: {type: String, required: true},
    eventId: {type: String, required: true},
    eventTitle: {type: String, required: true},
    receiveEmail: {type: String, required: true},
    note: {type: String}
}, {
  timestamps: true,
});

const Invitation = mongoose.model('Invitation', inviteSchema);
module.exports = Invitation;