'use strict';
let GitHubApi = require('github');
let token = 'df15283f67fa567e5bf7644388057274d113dd76';


function Github(callback) {

  var github = new GitHubApi({
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
  });

  github.authenticate({
    type: "oauth",
    token: token
  });


  github.events.getFromRepoIssues({
    user: 'katlavan',
    repo: 'check_delivery_time_and_status'
  }, function (err, ret) {
    if (err) {
      console.error('EBAT HIJNKA NEZDOROVAJA');
    } else {
      callback(ret);
    }
  });
}


module.exports = Github;