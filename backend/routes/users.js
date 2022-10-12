const router = require('express').Router();
let User = require('../models/user.model');

//Handles incoming HTTP get requests on /users/URL path
router.route('/').get((req, res) => {
    //gets a list of all users from db
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Nope'));
});

//Handles HTTP post requests on /user/add/url
router.route('/add').post((req, res) => {
  const oEventsInProgress = req.body.oEventsInProgress;
  const oEventsDone = req.body.oEventsDone;
  const pEventsInProgress = req.body.pEventsInProgress;
  const pEventsDone = req.body.pEventsDone;
  const name = req.body.name;
  const googleId = req.body.googleId;


  const newUser = new User({
    oEventsInProgress,
    oEventsDone,
    pEventsInProgress,
    pEventsDone,
    name,
    googleId
  });
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  User.findOne({'googleId': req.params.id})
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findOne({'googleId': req.params.id})
    .then(event => {
      event.oEventsInProgress = req.body.oEventsInProgress;
      event.oEventsDone = req.body.oEventsDone;
      event.pEventsInProgress = req.body.pEventsInProgress;
      event.pEventsDone = req.body.pEventsDone;
      event.name = req.body.name;
      event.googleId = req.body.googleId

      event.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;