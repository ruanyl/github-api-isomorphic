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

  return {
    listCollaborators: listCollaborators
  };
};
