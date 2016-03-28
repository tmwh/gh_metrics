import { Schema } from '../db/schema';

var Label = Schema.Label;

export function saveLabels(dataObj) {
  for (let i of dataObj) {
    var label_in = new Label({
      name: i.name,
      color: i.color
    });
    label_in.save(function (err, label) {
      if (err) return console.error(err);
    });
  }
}