'use strict';
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
let Event = require('../models/events.es6').Event;

/* GET home page. */
router.get('/', function (req, res, next) {
    Event.find(function (err, events) {
        if (err) return console.error(err);
        res.render('issues', { issues: events });
    });
});

router.post('/', function (req, res) {

});

module.exports = router;

