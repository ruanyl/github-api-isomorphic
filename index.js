var _repos = require('./src/repos');
var base64 = require('js-base64').Base64;

function Github() {
  this.authMiddleware = null;
}

Github.prototype.basicAuth = function(username, password) {
  this.authMiddleware = function() {
    var basic = base64.encode(username + ':' + password);
    return function(req) {
      req.set('Authorization', 'Basic ' + basic);

      return req;
    };
  };
};

Github.prototype.repos = function(user, repo) {
  return _repos(this.authMiddleware, user, repo);
};

module.exports = Github;
