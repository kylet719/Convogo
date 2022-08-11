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
  const discussion = req.body.discussion;
  const activities = req.body.activities

  const newEvent = new Event({
    owner,
    title,
    editors,
    itinerary,
    discussion,
    activities,
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

  router.route('/update/:id').post((req, res) => {
    Event.findById(req.params.id)
      .then(event => {
        event.owner = req.body.owner;
        event.title = req.body.title;
        event.editors = req.body.editors;
        event.itinerary = req.body.itinerary;
        event.discussion = req.body.discussion;
        event.activities = req.body.activities
  
        event.save()
          .then(() => res.json('Event updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.r

module.exports = router;