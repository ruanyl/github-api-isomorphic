var Github = require('../lib/index');
var test = require('tape');
require('dotenv').load();

var username = process.env.GITHUB_USER;
var password = process.env.GITHUB_PASS;
var github = new Github();
github.basicAuth(username, password);
var repos = github.repos('ruanyl', 'issue-todo');

test('List Collaborators', function(t) {
  repos.listCollaborators().then(function(data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'return data should be an array');
    t.ok(data.length > 0, 'it should has more one collaborators');
    t.end();
  });
});

test('Is Collaborators', function(t) {
  t.plan(2);
  repos.isCollaborator('ruanyl').then(function(isCo) {
    t.ok(isCo, 'it should return true if is a collaborator');
  });

  repos.isCollaborator('anonymous').then(function(isCo) {
    t.notOk(isCo, 'it should return false if not a collaborator');
  });
});

test('Add Collaborator', function(t) {
  repos.addCollaborator('daemonjs').then(function(isCo) {
    t.ok(isCo === true, 'it should return true if successfully added a user');
    t.end();
  });
});

test('Remove Collaborator', function(t) {
  repos.removeCollaborator('daemonjs').then(function(isCo) {
    t.ok(isCo === true, 'it should return true if successfully removed a user');
    t.end();
  });
});
