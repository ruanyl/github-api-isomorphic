var Github = require('../lib/index');
var test = require('tape');
require('dotenv').load();

var username = process.env.GITHUB_USER;
var password = process.env.GITHUB_PASS;
var github = new Github();
github.basicAuth(username, password);
var repos = github.repos('tj', 'frontend-boilerplate');

test('List Forks', function(t) {
  t.plan(2);

  repos.listForks(function(err, data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'it should return an array of forks');
  });

  repos.listForks({sort: 'oldest'}, function(err, data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'it should return an array of forks');
  });
});

test('Create Forks', function(t) {
  t.plan(1);

  repos.createForks(function(err, data) {
    console.log(data);
    t.equal(Object.prototype.toString.call(data), '[object Object]', 'it should return an object of fork information');
  });
});
