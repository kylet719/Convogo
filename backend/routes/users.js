const router = require('express').Router();
let User = require('../models/user.model');

//Handles incoming HTTP get requests on /users/URL path
router.route('/').get((req, res) => {
    //gets a list of all users from db
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Handles HTTP post requests on /user/add/url
router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;