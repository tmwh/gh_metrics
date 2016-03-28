'use strict';

import express from 'express';
import { Schema } from './../db/schema.es6';
import { Db as db }  from './../db/db.es6';
import { parseEventstoGraphs } from '../services/Metrics.es6';
import { Github } from '../services/Github.es6';

var router = express.Router();

const eventList = ['labeled', 'unlabeled'];
let Event = Schema.Event;

router.get('/', function (req, res) {
  Event.find(function (err, events) {
    if (err) return console.error(err);
    res.render('issues', {issues: events});
  });
});


router.get('/data', function (req, res) {
  Github.getLabels(renderLabels, res);
});

router.post('/upload', (req, res)=> {
  let checkedLabels = [];
  for (let key of Object.keys(req.body)) {
    if(req.body[key] == 'on') {
      checkedLabels.push(key);
    }
  }

  Event.find({
    event: {$in: eventList},
    "label.name": {$in:  checkedLabels},
    created: {
      $gte: req.body.startDate,
      $lt: req.body.endDate
    }

  }).sort({created: 'asc'}).exec(
    function (err, events) {
      if (err) return console.error(err);
      parseEventstoGraphs(events, res,
        {
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          labels: checkedLabels
      });
    });
  //res.status(200).send('received upload:\n\n');
});

function renderLabels (labels, res) {
  res.render('metrics', {finalArray: [], labels: labels});
}

module.exports = router;

