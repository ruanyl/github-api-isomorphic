var Github = require('../lib/index');
var test = require('tape');
require('dotenv').load();

var username = process.env.GITHUB_USER;
var password = process.env.GITHUB_PASS;
var github = new Github();
github.basicAuth(username, password);
var repos = github.repos('ruanyl', 'issue-todo');

test('List All My Repos', function(t) {
  t.plan(2);
  repos.listMyRepos(function(err, data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'it should return an array of repos');
    t.ok(data.length > 0, 'it should return at least one repo');
  });
});

test('List My Private Repos', function(t) {
  var options = {
    visibility: 'private'
  };
  repos.listMyRepos(options, function(err, data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'it should return an array of repos');
    data.forEach(function(repo) {
      t.ok(repo.private === true, 'it should return provate repo');
    });
    t.end();
  });
});

test('List User Repos', function(t) {
  var options = {
    type: 'member'
  };
  var repos = github.repos();
  repos.listUserRepos('gaearon', options, function(err, data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'it should return an array of repos');
    data.forEach(function(repo) {
      t.ok(repo.owner.login !== 'gaearon', 'owner of the repos should be someone other than gaearon');
    });
    t.end();
  });
});
