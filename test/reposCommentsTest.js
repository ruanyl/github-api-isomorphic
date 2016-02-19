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

test('Add Comment', function(t) {
  var comment = {
    body: 'test comment'
  };
  return repos.createComment('79b30be', comment).then(function(data) {
    t.equal(Object.prototype.toString.call(data), '[object Object]', 'it should return the comment object when creating a comment');
  });
});

test('List Comments branch', function(t) {
  return repos.listComments('master').then(function(data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'master branch return data should be an array');
  });
});

test('List Comments all', function(t) {
  return repos.listComments().then(function(data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'return data should be an array');
  });
});

test('Get Comment', function(t) {
  return repos.listComments().then(function(data) {
    return repos.getComment(data[0]['id'], function(data) {
      t.equal(Object.prototype.toString.call(data), '[object Object]', 'it should return a comment object when get comment by id');
    });
  });
});

test('Update Comment', function(t) {
  return repos.listComments().then(function(data) {
    return repos.updateComment(data[0]['id'], {body: 'update test comment'}).then(function(data) {
      t.equal(Object.prototype.toString.call(data), '[object Object]', 'it should return a comment object when update comment by id');
    });
  });
});

test('Delete Comment', function(t) {
  return repos.listComments().then(function(data) {
    return repos.deleteComment(data[0]['id']).then(function(ret) {
      t.ok(ret, 'delete a comment should return true');
    });
  })
});
