import { Schema } from './../db/schema.es6';
import { Db as db }  from './../db/db.es6';

export const eventList = ['labeled', 'unlabeled'];

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

export function parseEventstoGraphs(ev, res, options) {
  let labelsList = options.labels;
  let finalArray = [];
  console.log(options);
  let dayRange = (new Date(options.endDate) - new Date(options.startDate)) / 8.64e7;
  let currentDate = new Date(options.startDate);
  for (let j = 1; j <= dayRange + 1; j++) {
    finalArray.push(new dayObject(currentDate, labelsList));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  let dayOfEvents = new dayObject(currentDate, labelsList);

  for (let day of finalArray) {
    for (let event of ev) {
      day[event.label.name] = dayOfEvents[event.label.name];
      //let e = (labelsList.indexOf(event.label.name) > -1);
      if (day.day.getDate() == event.created.getDate()) {

        if (event.event == eventList[1]) {
          // TODO: realize first unlabeled for previous status
        }

        if (event.event == eventList[0]) {
          dayOfEvents[event.label.name] += 1;
        }

      }
    }
  }
  res.status(200).send(finalArray);
}
