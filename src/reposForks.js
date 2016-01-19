var request = require('superagent');

module.exports = function(authMiddleware, url) {
  function listForks(data, cb) {
    const _url = `${url}/forks`;

    if(Object.prototype.toString.apply(data) !== '[object Object]') {
      cb = data;
      data = {};
    }

    request
      .get(_url)
      .query(data)
      .use(authMiddleware)
      .end(function(err, res) {
        if(err || !res.ok) {
          cb(err);
        } else {
          cb(null, res.body);
        }
      });
  }

  function createForks(data, cb) {
    const _url = `${url}/forks`;

    if(Object.prototype.toString.apply(data) !== '[object Object]') {
      cb = data;
      data = {};
    }

    request
      .post(_url)
      .send(data)
      .use(authMiddleware)
      .end(function(err, res) {
        if(err || !res.ok) {
          cb(err);
        } else {
          cb(null, res.body);
        }
      });
  }

  return {
    listForks,
    createForks
  };
};
