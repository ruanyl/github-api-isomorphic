var request = require('superagent');

module.exports = function(authMiddleware, url) {
  function listDeployKeys(cb) {
    const _url = `${url}/keys`;

    request
      .get(_url)
      .use(authMiddleware)
      .end(function(err, res) {
        if(err || !res.ok) {
          cb(err);
        } else {
          cb(null, res.body);
        }
      });
  }

  function getDeployKey(id, cb) {
    const _url = `${url}/keys/${id}`;

    request
      .get(_url)
      .use(authMiddleware)
      .end(function(err, res) {
        if(err || !res.ok) {
          cb(err);
        } else {
          cb(null, res.body);
        }
      });
  }

  // Details: https://developer.github.com/v3/repos/keys/#add-a-new-deploy-key
  function addDeployKey(data, cb) {
    const _url = `${url}/keys`;

    request
      .post(_url)
      .use(authMiddleware)
      .send(data)
      .end(function(err, res) {
        if(err || !res.ok) {
          cb(err);
        } else {
          cb(null, res.body);
        }
      });
  }

  function removeDeployKey(id, cb) {
    const _url = `${url}/keys/${id}`;

    request
      .del(_url)
      .use(authMiddleware)
      .end(function(err, res) {
        if(err || !res.ok) {
          cb(err);
        } else if(res.status === 204) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      });
  }

  return {
    listDeployKeys,
    getDeployKey,
    addDeployKey,
    removeDeployKey
  };
};
