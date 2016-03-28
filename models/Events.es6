import { Schema } from '../db/schema';
import { Db } from '../db/db';

var Event = Schema.Event;
var Actor = Schema.Actor;
var Label = Schema.Label;
var tmpData = {};

export function saveEvents(dataObj, response) {
  if (dataObj) {
    tmpData = dataObj;
  }
  for (var i of tmpData) {
    var actor_in = new Actor({
      uid: i.actor.id,
      login: i.actor.login,
      avatar_url: i.actor.avatar_url
    });
    actor_in.save(function (err, actore) {
      if (err) return console.error(err);
    });


    var event_in = new Event({
      actor: actor_in,
      event: i.event,
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
      var label_in = new Label({
        name: i.label.name,
        color: i.label.color
      });

      label_in.save(function (err, label) {
        if (err) return console.error(err);
      });

      event_in.label = label_in;
    }

    event_in.save(function (err, event) {
      if (err) return console.error(err);
    });
  }
  response.status(200).send('Events was Updated');
}
