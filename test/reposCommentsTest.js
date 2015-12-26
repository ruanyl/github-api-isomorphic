var Github = require('../lib/index');
var test = require('tape');
require('dotenv').load();

var username = process.env.GITHUB_USER;
var password = process.env.GITHUB_PASS;
var github = new Github();
github.basicAuth(username, password);
var repos = github.repos('ruanyl', 'issue-todo');

test('List Comments', function(t) {
  t.plan(2);
  repos.listComments('master', function(err, data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'master branch return data should be an array');
  });

  repos.listComments(function(err, data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'return data should be an array');
  });
});
