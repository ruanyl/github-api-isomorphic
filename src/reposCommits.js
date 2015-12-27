var request = require('superagent');

module.exports = function(authMiddleware, url) {
  /**
   * Details: https://developer.github.com/v3/repos/commits/#list-commits-on-a-repository
   */
  function listCommits(data, cb) {
    const _url = `${url}/commits`;

    if(Object.prototype.toString.apply(data) !== '[object Object]') {
      cb = data;
      data = {};
    }

    request
      .get(_url)
      .use(authMiddleware())
      .query(data)
      .end(function(err, res) {
        if(err || !res.ok) {
          cb(err);
        } else {
          cb(null, res.body);
        }
      });
  }

  function getCommit(sha, cb) {
    const _url = `${url}/commits/${sha}`;

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

  /**
   * Details: https://developer.github.com/v3/repos/commits/#compare-two-commits
   * TODO: support media type
   * https://developer.github.com/v3/media/#commits-commit-comparison-and-pull-requests
   */
  function compareCommits(base, head, cb) {
    const _url = `${url}/compare/${base}...${head}`;

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
    listCommits: listCommits,
    getCommit: getCommit,
    compareCommits: compareCommits
  };
};
