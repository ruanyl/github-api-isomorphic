var Github = require('../lib/index');
var test = require('tape');
require('dotenv').load();

var username = process.env.GITHUB_USER;
var password = process.env.GITHUB_PASS;
var github = new Github();
github.basicAuth(username, password);
var repos = github.repos('ruanyl', 'issue-todo');

test('Add Comment', function(t) {
  t.plan(1);
  var comment = {
    body: 'test comment'
  };
  repos.createComment('79b30be', comment, function(err, data) {
    t.equal(Object.prototype.toString.call(data), '[object Object]', 'it should return the comment object when creating a comment');
  });
});

test('List Comments', function(t) {
  t.plan(2);
  repos.listComments('master', function(err, data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'master branch return data should be an array');
  });

  repos.listComments(function(err, data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'return data should be an array');
  });
});

test('Get Comment', function(t) {
  t.plan(2);
  repos.listComments(function(err, data) {
    repos.getComment(data[0]['id'], function(err, data) {
      t.equal(Object.prototype.toString.call(data), '[object Object]', 'it should return a comment object when get comment by id');
    });

    repos.updateComment(data[0]['id'], {body: 'update test comment'}, function(err, data) {
      t.equal(Object.prototype.toString.call(data), '[object Object]', 'it should return a comment object when update comment by id');
    });
  });
});

test('Delete Comment', function(t) {
  t.plan(1);
  repos.listComments('master', function(err, data) {
    repos.deleteComment(data[0]['id'], function(err, ret) {
      t.ok(ret, 'delete a comment should return true');
    });
  });
});
