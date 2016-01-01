var request = require('superagent');

module.exports = function(authMiddleware, url) {
  function listReleases(cb) {
    const _url = `${url}/releases`;

    request
      .get(_url)
      .use(authMiddleware())
      .end(function(err, res) {
        if(err || !res.ok) {
          cb(err);
        } else {
          cb(null, res.body);
        }
      });
  }

  function createRelease(data, cb) {
    const _url = `${url}/releases`;

    request
      .post(_url)
      .use(authMiddleware())
      .send(data)
      .end(function(err, res) {
        if(err || !res.ok) {
          cb(err);
        } else {
          cb(null, res.body);
        }
      });
  }

  function getRelease(id, cb) {
    const _url = `${url}/releases/${id}`;

    request
      .get(_url)
      .use(authMiddleware())
      .end(function(err, res) {
        if(err || !res.ok) {
          cb(err);
        } else {
          cb(null, res.body);
        }
      });
  }

  function getLatestRelease(cb) {
    const _url = `${url}/releases/latest`;

    request
      .get(_url)
      .use(authMiddleware())
      .end(function(err, res) {
        if(err || !res.ok) {
          cb(err);
        } else {
          cb(null, res.body);
        }
      });
  }

  function getReleaseByTag(tag, cb) {
    const _url = `${url}/releases/tags/${tag}`;

    request
      .get(_url)
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
    listReleases,
    createRelease,
    getRelease,
    getLatestRelease,
    getReleaseByTag
  };
};
