const router = require('express').Router();
let Chat = require('../models/chat.model');

//Handles incoming HTTP get requests on /chats/URL path
router.route('/').get((req, res) => {
    //gets a list of all chats from db
  Chat.find()
    .then(chats => res.json(chats))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Handles HTTP post requests on /chats/add/url
router.route('/add').post((req, res) => {
  const messages = req.body.messages;
  const activityid = req.body.activityid;
  const activityname = req.body.activityname
  const newChat = new Chat({
    messages, 
    activityid, 
    activityname
  });

  newChat.save()
    .then(() => res.json(newChat._id))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Chat.findById(req.params.id)
      .then(event => res.json(event))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Chat.findByIdAndDelete(req.params.id)
      .then(() => res.json('Chat deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').post((req, res) => {
    Chat.findById(req.params.id)
      .then(event => {
        event.messages = req.body.messages;
        event.activityid = req.body.activityid;
        event.activityname = req.body.activityname
  
        event.save()
          .then(() => res.json('Chat updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;