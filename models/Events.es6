import { Schema } from '../db/schema';
import { labelEvents } from './../parser/Metrics.es6';

export function saveEvents(dataObj, response) {
  console.log('Save events');
  let Event = Schema.Event;
  let Actor = Schema.Actor;
  let Label = Schema.Label;

  for (var i of dataObj) {

    var actor_in = new Actor({
      uid: i.actor.id,
      login: i.actor.login,
      avatar_url: i.actor.avatar_url
    });
    actor_in.save(function (err, fluffy) {
      if (err) return console.error(err);
    });



    var event_in = new Event({
      actor: actor_in,
      event: i.event,
      label: label_in,
      created: i.created_at,
      issue: {
        number: i.issue.number,
        title: i.issue.title,
        labels: [],
        created: i.issue.created_at,
        updated: i.issue.updated_at
      }
    });

    if (i.label) {
      var label_labeled = i.label ? i.label.name : null;
      var label_in = new Label({
        name: label_labeled
      });

      label_in.save(function (err, fluffy) {
        if (err) return console.error(err);
      });
      event_in.label =  label_in;
    }

    event_in.save(function (err, fluffy) {
      if (err) return console.error(err);
    });
  }
  //}
  response.status(200).send('Git was Updated');
}

export function getEvents() {

  console.log('Save events');
  console.log(typeof labelEvents);
  //let Event = Schema.Event;
  //let Events = Event.find();
  return labelEvents;
}