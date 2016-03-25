import { Schema } from '../db/schema';

export function saveEvents (dataObj, response) {
  console.log('Save events');
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
      });
    }
  }
  response.status(200).send('Git was Updated');
}