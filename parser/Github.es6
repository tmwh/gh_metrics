'use strict';
import GitHubApi from 'github';
let token = 'df15283f67fa567e5bf7644388057274d113dd76';
let apiConfig = {
  // required
  version: "3.0.0",
  // optional
  debug: true,
  protocol: "https",
  host: "api.github.com", // should be api.github.com for GitHub
  //pathPrefix: "/api/v3", // for some GHEs; none for GitHub
  timeout: 5000,
  headers: {
    "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
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
  }
}

export let Github = new GitApi();