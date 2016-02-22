var Github = require('../lib/index');
var tape = require('tape');
var _test = require('tape-promise');
var test = _test(tape);
var base64 = require('js-base64').Base64;
require('dotenv').load();

var username = process.env.GITHUB_USER;
var password = process.env.GITHUB_PASS;
var github = new Github();
github.basicAuth(username, password);
var repos = github.repos('ruanyl', 'issue-todo');

test('Get Readme', function(t) {
  return repos.getReadme().then(function(data) {
    t.equal(data.type, 'file', 'type of readme should be a file');
  });
});

test('Get Readme by hash', function(t) {
  return repos.getReadme({ref: '6e3e7b09480c4cf0e877ab44bc5f6943bef1894d'}).then(function(data) {
    t.equal(data.type, 'file', 'type of readme should be a file');
  });
});

test('Get Readme by ref', function(t) {
  return repos.getReadme({ref: 'master'}).then(function(data) {
    t.equal(data.type, 'file', 'type of readme should be a file');
  });
});

test('Get Contents', function(t) {
  return repos.getContents().then(function(data) {
    t.ok(data.length >= 0, 'it should return a list of files');
  });
});

test('Get Contents by ref', function(t) {
  return repos.getContents('/', {ref: 'master'}).then(function(data) {
    t.ok(data.length >= 0, 'it should return a list of files');
  });
});

test('Get Contents by file name', function(t) {
  return repos.getContents('README.md').then(function(data) {
    t.equal(data.name, 'README.md', 'it should return the same filename');
  });
});

test('Get Contents of folder', function(t) {
  return repos.getContents('actions').then(function(data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]',
            'it should return an array of contents for an specified path');
  });
});

test('Get Contents by name from a specific ref', function(t) {
  return repos.getContents('README.md', {ref: 'master'}).then(function(data) {
    t.ok(data.html_url.indexOf('master') > 0, 'it should return the file of the master branch');
    t.equal(data.name, 'README.md', 'it should return the same filename as specified');
  });
});

test('Create a File', function(t) {
  return repos.createFile('test.md', {
    message: 'test add file',
    content: base64.encode('test content')
  }).then(function(data) {
    t.equal(data.content.name, 'test.md', 'it should create a file named test.md');
  });
});

test('Update a File', function(t) {
  return repos.getContents('test.md').then(function(data) {
    return repos.updateFile('test.md', {
      message: 'test update file',
      content: base64.encode('test update content'),
      sha: data.sha
    }).then(function(data) {
      t.equal(data.content.name, 'test.md', 'it should update a file named test.md');
    });
  });
});

test('Delete a File', function(t) {
  return repos.getContents('test.md').then(function(data) {
    return repos.deleteFile('test.md', {
      message: 'test delete file',
      sha: data.sha
    }).then(function(data) {
      t.equal(data.content, null, 'it should delete a file named test.md');
    });
  });
});

test('Get Archive Link', function(t) {
  return repos.getArchiveLink().then(function(data) {
    t.ok(data.indexOf('.tar.gz') > 0, 'it should return the .tar.gz format archive link by default');
  });
});

test('Get Archive Link in zip format', function(t) {
  return repos.getArchiveLink('zipball').then(function(data) {
    t.ok(data.indexOf('.zip') > 0, 'it should return the .zip format archive link');
  });
});
