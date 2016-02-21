var Github = require('../lib/index');
var tape = require('tape');
var _test = require('tape-promise');
var test = _test(tape);
require('dotenv').load();

var username = process.env.GITHUB_USER;
var password = process.env.GITHUB_PASS;
var github = new Github();
github.basicAuth(username, password);
var repos = github.repos('ruanyl', 'issue-todo');

test('List Commits', function(t) {
  return repos.listCommits().then(function(data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'it should return an array of commits');
  });

  var commit = {
    sha: '6e3e7b09480c4cf0e877ab44bc5f6943bef1894d'
  };
  repos.listCommits(commit, function(err, data) {
    t.equal(Object.prototype.toString.call(data),
            '[object Array]', 'it should return an array of commits after a commit sha');
  });
});

test('List Commits by hash', function(t) {
  var commit = {
    sha: '6e3e7b09480c4cf0e877ab44bc5f6943bef1894d'
  };
  return repos.listCommits(commit).then(function(data) {
    t.equal(Object.prototype.toString.call(data),
            '[object Array]', 'it should return an array of commits after a commit sha');
  });
});

test('Get Single Commit', function(t) {
  return repos.getCommit('6e3e7b09480c4cf0e877ab44bc5f6943bef1894d').then(function(data) {
    t.equal(Object.prototype.toString.call(data), '[object Object]', 'it should return an object of commit');
    t.equal(data.sha, '6e3e7b09480c4cf0e877ab44bc5f6943bef1894d', 'it should return the commit with the same hash');
  });
});

test('Compare two Commits', function(t) {
  // branch name or commit hash here
  var sha1 = 'master';
  var sha2 = 'test';
  return repos.compareCommits(sha1, sha2).then(function(data) {
    t.equal(Object.prototype.toString.call(data), '[object Object]', 'it should return an object comparison results');
  });
});
