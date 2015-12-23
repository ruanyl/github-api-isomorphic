var request = require('superagent');
var base64 = require('js-base64').Base64;
var endpoint = require('./endpoint');

module.exports = function(authMiddleware, user, repo) {
  var url = endpoint.root + '/repos/' + user + '/' + repo + '/collaborators';

  function listCollaborators(cb) {
    request
      .get(url)
      .use(authMiddleware())
      .end(function(err, res) {
        if(err || !res.ok) {
          cb(err);
        } else {
          cb(null, res.body);
        }
      });
  }

  function isCollaborator(username, cb) {
    request
      .get(url + '/' + username)
      .use(authMiddleware())
      .end(function(err, res) {
        if(err && err.status === 404) {
          cb(null, false);
        } else if(res.status === 204) {
          cb(null, true);
        } else {
          cb(err);
        }
      });
  }

  return {
    listCollaborators: listCollaborators,
    isCollaborator: isCollaborator
  };
};
