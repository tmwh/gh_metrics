'use strict';
import GitHubApi from 'github';
import { Schema } from '../db/schema.es6';

let token = '<github token here>';

let apiConfig = {
  version: "3.0.0",
  debug: true,
  protocol: "https",
  host: "api.github.com",
  timeout: 5000,
  headers: {
    "user-agent": "My-Metrics-GitHub-App"
  }
};

class GitApi{
  constructor() {
    this.api = new GitHubApi(apiConfig);
    this.authentificate();
  }

  authentificate() {
    this.api.authenticate({
      type: "oauth",
      token: token
    })
  }

  getEvents(callback, resObj) {
    Schema.Event.find().remove( (err) => {
      if (err) return console.log(err);
      // removed!
      this.api.events.getFromRepoIssues({
          user: 'katlavan',
          repo: 'check_delivery_time_and_status'
        }, (err, events) => {
          if (err) {
            console.error(`Issues not received - Error ${err}`);
          }
          callback(events, resObj);
        }
      )
    });
  }

  getLabels(callback, response) {
    this.api.issues.getLabels({
      user: 'katlavan',
      repo: 'check_delivery_time_and_status'
    }, (err, labels) => {
      if (err) {
        console.error(`Issues not received - Error ${err}`);
      }
      callback(labels, response);
    })
  }
}

export let Github = new GitApi();