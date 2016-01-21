var request = require('superagent');

module.exports = function(authMiddleware, url) {
  function listMyRepos(data, cb) {
    if(Object.prototype.toString.apply(data) !== '[object Object]') {
      cb = data;
      data = {};
    }

    const _url = `${url}/user/repos`;

    request
      .get(_url)
      .use(authMiddleware)
      .query(data)
      .end(function(err, res) {
        if(err || !res.ok) {
          cb(err);
        } else {
          cb(null, res.body);
        }
      });
  }

  function listUserRepos(username, data, cb) {
    if(Object.prototype.toString.apply(data) !== '[object Object]') {
      cb = data;
      data = {};
    }

    const _url = `${url}/users/${username}/repos`;

    request
      .get(_url)
      .use(authMiddleware)
      .query(data)
      .end(function(err, res) {
        if(err || !res.ok) {
          cb(err);
        } else {
          cb(null, res.body);
        }
      });
  }

  return {
    listMyRepos: listMyRepos,
    listUserRepos: listUserRepos,
  };
};
