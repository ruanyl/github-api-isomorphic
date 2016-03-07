var Github = require('../lib/index');
var tape = require('tape');
var _test = require('tape-promise');
var test = _test(tape);
require('dotenv').load();

var username = process.env.GITHUB_USER;
var password = process.env.GITHUB_PASS;
var github = new Github();
github.basicAuth(username, password);
var repos = github.repos('tj', 'frontend-boilerplate');

test('List Forks', function(t) {
  return repos.listForks().then(function(data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'it should return an array of forks');
  });
});
