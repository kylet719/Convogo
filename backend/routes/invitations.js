const router = require('express').Router();
let Invitation = require('../models/invitation.model');

//Handles incoming HTTP get requests on /invitation/URL path
router.route('/').get((req, res) => {
    //gets a list of all chats from db
  Invitation.find()
    .then(chats => res.json(chats))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Handles HTTP post requests on /chats/add/url
router.route('/add').post((req, res) => {
  const senderEmail = req.body.senderEmail;
  const senderPic = req.body.senderPic;
  const senderName = req.body.senderName;
  const eventId = req.body.eventId;
  const eventTitle = req.body.eventTitle;
  const receiveEmail = req.body.receiveEmail
  const note = req.body.note
  const newInvite = new Invitation({
    senderEmail,
    senderPic,
    senderName,
    eventId,
    eventTitle,
    receiveEmail,
    note
  });

  newInvite.save()
    .then(() => res.json(newInvite._id))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Invitation.findById(req.params.id)
      .then(event => res.json(event))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/batch').post((req, res) => {
  Invitation.find({
    'receiveEmail': req.body.email
})
    .then(invites => res.json(invites))
    .catch(err => res.status(400).json('Error: ' + err));
});
  
router.route('/:id').delete((req, res) => {
  Invitation.findByIdAndDelete(req.params.id)
    .then(() => res.json('Invitation deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/update/:id').post((req, res) => {
//   Invitation.findById(req.params.id)
//     .then(event => {
//       event.messages = req.body.messages;
//       event.activityid = req.body.activityid;
//       event.activityname = req.body.activityname

//       event.save()
//         .then(() => res.json('Chat updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;