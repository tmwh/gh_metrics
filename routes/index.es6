'use strict';
var express = require('express');
//let _ = require('lodash-node');
var router = express.Router();

import { saveEvents } from '../models/Events'
import { Github } from '../parser/Github';


//let github = new Github();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});
router.post('/', (req, res, next) => {
  if (req.query.updategit) {
    Github.getEvents(saveEvents, res);
  } else {
    res.status(200).send('No events for update');
  }
});

module.exports = router;
