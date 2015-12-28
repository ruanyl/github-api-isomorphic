var Github = require('../lib/index');
var test = require('tape');
var base64 = require('js-base64').Base64;
require('dotenv').load();

var username = process.env.GITHUB_USER;
var password = process.env.GITHUB_PASS;
var github = new Github();
github.basicAuth(username, password);
var repos = github.repos('ruanyl', 'issue-todo');

test('Get Readme', function(t) {
  t.plan(3);
  repos.getReadme(function(err, data) {
    t.equal(Object.prototype.toString.call(data), '[object Object]', 'it should return an object of the readme details');
  });

  repos.getReadme({ref: '6e3e7b09480c4cf0e877ab44bc5f6943bef1894d'}, function(err, data) {
    t.equal(Object.prototype.toString.call(data),
            '[object Object]', 'it should return an object of the readme details of a specified commit');
  });

  repos.getReadme({ref: 'master'}, function(err, data) {
    t.equal(Object.prototype.toString.call(data),
            '[object Object]', 'it should return an object of the readme details of a specified branch');
  });
});

test('Get Contents', function(t) {
  t.plan(5);

  repos.getContents(function(err, data) {
    t.ok(['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(data)) >= 0,
         'it should return an object or an array of files');
  });

  repos.getContents({ref: 'master'}, function(err, data) {
    t.ok(['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(data)) >= 0,
          'it should return an object or an array of files of a specified ref');
  });

  repos.getContents('README.md', function(err, data) {
    t.equal(Object.prototype.toString.call(data), '[object Object]',
            'it should return an object content for an specified filename');
  });

  repos.getContents('actions', function(err, data) {
    t.equal(Object.prototype.toString.call(data), '[object Array]',
            'it should return an array of contents for an specified path');
  });

  repos.getContents('README.md', {ref: 'master'}, function(err, data) {
    t.ok(['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(data)) >= 0,
         'it should return an object or an array of files for a specified filename and ref');
  });
});

test('Create a File', function(t) {
  t.plan(3);

  repos.createFile('test.md', {
    message: 'test',
    content: base64.encode('test content')
  }, function(err, data) {
    t.equal(Object.prototype.toString.call(data), '[object Object]',
            'it should return an object of commits information if file created successfully');

    repos.updateFile('test.md', {
      message: 'test update',
      content: base64.encode('test update content'),
      sha: data.content.sha
    }, function(err, data) {
      t.equal(Object.prototype.toString.call(data), '[object Object]',
              'it should return an object of commits information if file updated successfully');

      repos.deleteFile('test.md', {
        message: 'test update',
        sha: data.content.sha
      }, function(err, data) {
        t.equal(Object.prototype.toString.call(data), '[object Object]',
                'it should return an object of commits information if file updated successfully');
      });
    });
  });

});

test('Get Archive Link', function(t) {
  t.plan(5);

  repos.getArchiveLink(function(err, data) {
    t.ok(Object.prototype.toString.call(data) === '[object String]', 'it should return the archive link');
  });

  repos.getArchiveLink('zipball', function(err, data) {
    t.ok(Object.prototype.toString.call(data) === '[object String]', 'it should return the archive link');
    t.ok(data.indexOf('.zip') > 0, 'it should return the .zip format archive link');
  });

  repos.getArchiveLink('zipball', 'test', function(err, data) {
    t.ok(Object.prototype.toString.call(data) === '[object String]', 'it should return the archive link');
    t.ok(data.indexOf('test?') > 0, 'it should return the archive link of a specified branch');
  });
});
