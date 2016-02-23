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

test('Add a Deploy Key', function(t) {
  var sshKey = {
    title: 'test key',
    key: 'ssh-dss AAAAB3NzaC1kc3MAAACBAP8dIxxSiRuU3usYHEX+WxFMCLEfa2JXGwDteBMb8rG9LJmrx0blz1gVpUuoo2f9axhh7bNYXCux2UvAFta2BGiU8WVhoTs8W2rfbyHs15HWjnnN5Z0JsiZ+rzU3mNnPP3M3M0td0eMFdG064R3pv+pxOxRT7urQagIOShvUDK6PAAAAFQDdizBwqC6KqfCAbpw1XDH5NjGRiQAAAIBfXFlYFjDjCH5F+lXb62A7NdVewpoe18WUxTgEC75qzC4iH7tlJyjZNWfjeC53Y+wGHCygWzWp9A4GKMFIhLzvmbRV/aviC2y5/7i+b1f6qucl+nm0fFFaePyim/e55Elgl4jXDma3cJ9qmFXZTNdEHUqA77W2FqaswQTAWYxltAAAAIAYlW8qjfjhH4deVSIoIiry2DjxXozxW06FbTxgSiW4a5P2ExgZh0W1vXaPLWJxwUjDQuGdvQmR4jy4ALGjFNXguRlt368K2rbkY7MEISVOJOUpphUIorAf4mOABVCMLbHnGry+t7RaAFgTn6xDm/QMut0EtydN9rLv5rxYzH8nBQ==',
    read_only: true
  };
  return repos.addDeployKey(sshKey).then(function(data) {
    t.equal(data.key, sshKey.key, 'it should return the same key');
  });
});

test('List Deploy Keys', function(t) {
  return repos.listDeployKeys().then(function(data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]', 'it should return an array of keys');
  });
});

test('Get Deploy Key', function(t) {
  return repos.listDeployKeys().then(function(data) {
    return repos.getDeployKey(data[0].id).then(function(key) {
      t.equal(key.id, data[0].id, 'it should return the same id of key');
    });
  });
});

test('Remove a Deploy Key', function(t) {
  return repos.listDeployKeys().then(function(data) {
    return repos.removeDeployKey(data[0].id).then(function(ret) {
      t.ok(ret, 'it should return true if key is removed');
    });
  });
});
