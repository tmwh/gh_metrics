'use strict';
var express = require('express');
let Github = require('../parser/issues_parser.es6');
let Schema = require('../models/events.es6');
let _ = require('lodash-node');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});
router.post('/', function (req, res, next) {
  function parseGit(dataObj) {
    let Event = Schema.Event;
    for (var i of dataObj) {
      if (i.event == 'labeled' || i.event == 'unlabeled') {
        //var label_labeled = i.label ? i.label : null;
        var event_in = new Event({
          actor: {
            uid: i.actor.id,
            login: i.actor.login,
            avatar_url: i.actor.avatar_url
          },
          event: i.event,
          label: {
            name: i.label.name
          },
          created: i.created_at,
          issue: {
            number: i.issue.number,
            title: i.issue.title,
            labels: [],
            created: i.issue.created_at,
            updated: i.issue.updated_at
          }
        });
        event_in.save(function (err, fluffy) {
          if (err) return console.error(err);
          console.log('Model saved');
        });
      }
    }
    res.status(200).send('Git was Updated');
  }
  Github(parseGit);
  console.log(req.query);
  //res.status(200).send('Git was Updated');
  //next();
});

module.exports = router;
