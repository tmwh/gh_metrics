'use strict';
//var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();


//import formidable from 'formidable';
//import util from 'util';
import { Schema } from './../db/schema.es6';
import { Db as db }  from './../db/db.es6';
//import { parseEventstoGraphs, eventList, labelsList, startDate, lastDate } from '../parser/Metrics.es6';

let Event = Schema.Event;

/* GET home page. */
router.get('/', function (req, res, next) {
  Event.find(function (err, events) {
    if (err) return console.error(err);
    res.render('issues', {issues: events});
  });
});
const eventList = ['labeled', 'unlabeled'];
const labelsList = ['ready', 'progress', 'testing QA'];
const startDate = new Date("2016-03-01T09:23:14Z");
const lastDate = new Date("2016-03-28T09:23:14Z");

class dayObject {
  constructor(date, props) {
    this.day = new Date(date);
    this.addTrackingProperties(props)
  }

  addTrackingProperties(props) {
    for (var i  of props) {
      this[i] = 0;
    }
  }
}

function parseEventstoGraphs(ev, res) {
  let finalArray = [];
  let dayRange = (lastDate - startDate) / 8.64e7;
  let currentDate = new Date("2016-03-01T09:23:14Z");
  for (let j = 1; j <= dayRange + 1; j++) {
    finalArray.push(new dayObject(currentDate, labelsList));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  let dayOfEvents = new dayObject(currentDate, labelsList);

  // Added status by first unlabeled
  //for (let j = 0, length = finalArray.length; j < length; j++) {
  //
  //  for (let e = 0, len = ev.length; e < len; e++) {
  //    if (finalArray[j].day.getDate() == ev[e].created.getDate() && ev[e].event == eventList[1]) {
  //      console.log(ev[e].label.name);
  //
  //      let r = j;
  //      while (r >= 0) {
  //        finalArray[r][ev[e].label.name] += 1;
  //        console.log(finalArray[r]);
  //
  //        r--;
  //      }
  //    }
  //  }
  //}

  for (let day of finalArray) {
    for (let event of ev) {
      day[event.label.name] = dayOfEvents[event.label.name];
      let e = (labelsList.indexOf(event.label.name) > -1);
      if (day.day.getDate() == event.created.getDate()) {

        if (event.event == eventList[1]) {
          //day[event.label.name] += 1
          console.log(event.label.name);
        }

        if (event.event == eventList[0]) {
          dayOfEvents[event.label.name] += 1;
        }

      }
    }
  }
//console.log(finalArray);
//  res.render('metrics', {finalArray: finalArray});
  res.status(200).send(finalArray);
}

router.get('/data', function (req, res) {

  res.render('metrics', {finalArray: []});
});

router.post('/upload', (req, res)=> {
  console.log(req.body);
  Event.find({
    event: {$in: eventList},
    "label.name": {$in: labelsList},
    created: {
      $gte: startDate,
      $lt: lastDate
    }

  }).sort({created: 'asc'}).exec(
    function (err, events) {
      if (err) return console.error(err);
      parseEventstoGraphs(events, res);
      //res.render('issues', {issues: events});
    });
  //res.status(200).send('received upload:\n\n');
});

module.exports = router;

