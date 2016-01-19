var _repos = require('./repos');
var base64 = require('js-base64').Base64;

function Github() {
  this.authMiddleware = null;
}

Github.prototype.basicAuth = function(username, password) {
  var basic = base64.encode(username + ':' + password);
  this.authMiddleware = function(req) {
    req.set('Authorization', 'Basic ' + basic);
    return req;
  };
};

Github.prototype.repos = function(user, repo) {
  return _repos(this.authMiddleware, user, repo);
};

module.exports = Github;
