const router = require('express').Router();
let Event = require('../models/event.model');

router.route('/').get((req, res) => {
  Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const owner = req.body.owner;
  const title = req.body.title;
  const editors = req.body.editors;
  const itinerary = req.body.itinerary;
  const polls = req.body.polls;
  const activites = req.body.activites

  const newEvent = new Event({
    owner,
    title,
    editors,
    itinerary,
    polls,
    activites,
  });

  newEvent.save()
  .then(() => res.json('event added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Event.findById(req.params.id)
      .then(event => res.json(event))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Event.findByIdAndDelete(req.params.id)
      .then(() => res.json('Event deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.r

module.exports = router;