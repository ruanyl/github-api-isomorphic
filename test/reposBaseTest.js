const Github = require('../lib/index');
const test = require('tape');
require('dotenv').load();

const username = process.env.GITHUB_USER;
const password = process.env.GITHUB_PASS;
const github = new Github();
github.basicAuth(username, password);
const repos = github.repos('ruanyl', 'issue-todo');

test('List All My Repos', function(t) {
  t.plan(2);
  repos.listMyRepos().then(function(data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'it should return an array of repos');
    t.ok(data.length > 0, 'it should return at least one repo');
  });
});

test('List My Private Repos', function(t) {
  const options = {
    visibility: 'private'
  };
  repos.listMyRepos(options).then(function(data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'it should return an array of repos');
    data.forEach(function(repo) {
      t.ok(repo.private === true, 'it should return provate repo');
    });
    t.end();
  });
});

test('List User Repos', function(t) {
  const options = {
    type: 'member',
  };
  const repos = github.repos();
  repos.listUserRepos('gaearon', options).then(function(data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'it should return an array of repos');
    data.forEach(function(repo) {
      t.ok(repo.owner.login !== 'gaearon', 'owner of the repos should be someone other than gaearon');
    });
    t.end();
  });
});
