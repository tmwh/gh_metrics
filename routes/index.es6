'use strict';
var express = require('express');
var router = express.Router();

import { saveEvents } from '../models/Events.es6';
import { Github } from '../services/Github';



router.get('/', function (req, res) {
  res.render('index', {title: 'Github Metrics Page'});
});

router.post('/', (req, res) => {
  if (req.query.updategit) {
    Github.getEvents(saveEvents, res);
  } else {
    res.status(200).send('No events for update');
  }
});

module.exports = router;
