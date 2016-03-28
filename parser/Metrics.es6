import { Schema } from './../db/schema.es6';
import { Db as db }  from './../db/db.es6';

export let startDate = new Date("2016-03-01T19:21:39Z");
export let lastDate = new Date('"2016-03-20T19:21:39Z"');

export const eventList = ['labeled', 'unlabeled'];
export const labelsList = ['ready', 'progress', 'testing QA'];

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

export function parseEventstoGraphs(ev, res) {
  let finalArray = [];
  let dayRange = (lastDate - startDate) / 8.64e7;
  let currentDate = new Date("2016-03-01T09:23:14Z");
    //console.log(ev);

  for (let j = 1; j <= dayRange + 1; j++) {
    finalArray.push(new dayObject(currentDate, labelsList));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  console.log(finalArray);
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
  console.log(finalArray);
  res.render('metrics', {finalArray: finalArray});
}
