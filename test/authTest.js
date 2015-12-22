var Github = require('../');
var test = require('ava');
require('dotenv').load();

var username = process.env.GITHUB_USER;
var password = process.env.GITHUB_PASS;

test.cb('Github repo collaborators', function(t) {
  var github = new Github();
  github.basicAuth(username, password);
  var repos = github.repos('ruanyl', 'oupai-dev');

  repos.listCollaborators(function(err, data) {
    t.is(Object.prototype.toString.call(data), '[object Array]', 'return data should be an array');
    t.ok(data.length > 0, 'it should has more one collaborators');
    t.end();
  });
});
