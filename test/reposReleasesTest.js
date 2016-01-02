var Github = require('../lib/index');
var test = require('tape');
require('dotenv').load();

var username = process.env.GITHUB_USER;
var password = process.env.GITHUB_PASS;
var github = new Github();
github.basicAuth(username, password);
var repos = github.repos('ruanyl', 'issue-todo');

test('List Releases', function(t) {
  t.plan(1);

  repos.listReleases(function(err, data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'it should return an array of Releases');
  });
});

test('Get a Releases', function(t) {
  t.plan(1);

  repos.listReleases(function(err, data1) {
    var id = data1[0].id;
    repos.getRelease(id, function(err, data2) {
      t.equal(Object.prototype.toString.call(data2), '[object Object]', 'it should return the release object');
    });
  });
});

test('List Assets of a Release', function(t) {
  t.plan(1);

  repos.getReleaseByTag('v1.0', function(err, data1) {
    var id = data1.id;
    repos.listAssets(id, function(err, data2) {
      t.equal(Object.prototype.toString.call(data2), '[object Array]', 'it should return the assets array');
    });
  });
});

test('Get Latest Releases', function(t) {
  t.plan(1);

  repos.getLatestRelease(function(err, data) {
    t.equal(Object.prototype.toString.call(data), '[object Object]', 'it should return the release object');
  });
});

test('Get Release By Tag', function(t) {
  t.plan(1);

  repos.getReleaseByTag('v1.0', function(err, data) {
    t.equal(Object.prototype.toString.call(data), '[object Object]', 'it should return the release object');
  });
});

test('Create Release', function(t) {
  t.plan(1);
  var data = {
    tag_name: 'v0.1.1',
    target_commitish: 'master',
    name: 'v0.1.1',
    body: 'Description of the release',
    draft: false,
    prerelease: false
  };
  repos.createRelease(data, function(err, data) {
    t.equal(Object.prototype.toString.call(data), '[object Object]', 'it should return the release object');
  });
});

test('Edit a Release', function(t) {
  t.plan(1);

  repos.getReleaseByTag('v0.1.1', function(err, data1) {
    var id = data1.id;
    var update = {
      tag_name: 'v0.1.1',
      name: 'test update',
      body: 'test update body',
      prerelease: true
    };
    repos.editRelease(id, update, function(err, data2) {
      t.equal(Object.prototype.toString.call(data2), '[object Object]', 'it should return the updated release object');
    })
  });
});

test('Delete a Release', function(t) {
  t.plan(1);

  repos.getReleaseByTag('v0.1.1', function(err, data1) {
    var id = data1.id;
    repos.deleteRelease(id, function(err, data2) {
      t.ok(data2, 'it should return ture if delete a release successfully');
    });
  });
});

