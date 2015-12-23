var Github = require('../');
var test = require('ava');
require('dotenv').load();

var username = process.env.GITHUB_USER;
var password = process.env.GITHUB_PASS;
var github = new Github();
github.basicAuth(username, password);
var repos = github.repos('ruanyl', 'oupai-dev');


test.cb('List Collaborators', function(t) {
  repos.listCollaborators(function(err, data) {
    t.is(Object.prototype.toString.call(data), '[object Array]', 'return data should be an array');
    t.ok(data.length > 0, 'it should has more one collaborators');
    t.end();
  });
});

test.cb('Is Collaborators', function(t) {
  repos.isCollaborator('ruanyl', function(err, isCo) {
    t.ok(isCo, 'it should return true if is a collaborator');
    t.end();
  });

});

test.cb('Not Collaborators', function(t) {
  repos.isCollaborator('anonymous', function(err, isCo) {
    t.notOk(isCo, 'it should return false if not a collaborator');
    t.end();
  });
});

test.cb('Add Collaborator', function(t) {
  repos.addCollaborator('daemonjs', function(err, isCo) {
    t.ok(isCo === true, 'it should return true if successfully added a user');
    t.end();
  });

});

test.cb('Remove Collaborator', function(t) {
  repos.removeCollaborator('daemonjs', function(err, isCo) {
    t.ok(isCo === true, 'it should return true if successfully removed a user');
    t.end();
  });

});
