'use strict';
var express = require('express');
var router = express.Router();

import { saveEvents } from '../models/Events.es6';
import { Github } from '../services/Github.es6';

router.post('/', function (req, res) {
  Github.getEvents(saveEvents, res);
});

module.exports = router;