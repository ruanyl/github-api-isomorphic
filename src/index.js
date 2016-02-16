require('es6-promise').polyfill();
var _repos = require('./repos');
var base64 = require('js-base64').Base64;

function Github() {
  this.auth = null;
}

Github.prototype.basicAuth = function(username, password) {
  var basic = base64.encode(username + ':' + password);
  this.auth = `Basic ${basic}`;
};

Github.prototype.repos = function(user, repo) {
  return _repos(this.auth, user, repo);
};

module.exports = Github;
