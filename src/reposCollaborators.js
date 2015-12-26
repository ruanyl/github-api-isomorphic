var request = require('superagent');

module.exports = function(authMiddleware, url) {
  function listCollaborators(cb) {
    const _url = `${url}/collaborators`;

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

  function isCollaborator(username, cb) {
    const _url = `${url}/collaborators/${username}`;

    request
      .get(_url)
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

  // TODO support permission of organization repos
  function addCollaborator(username, cb) {
    const _url = `${url}/collaborators/${username}`;

    request
      .put(_url)
      .use(authMiddleware())
      .end(function(err, res) {
        if(err || !res.ok) {
          cb(err);
        } else if(res.status === 204) {
          cb(null, true);
        }
      });
  }

  function removeCollaborator(username, cb) {
    const _url = `${url}/collaborators/${username}`;

    request
      .delete(_url)
      .use(authMiddleware())
      .end(function(err, res) {
        if(err || !res.ok) {
          cb(err);
        } else if(res.status === 204) {
          cb(null, true);
        }
      });
  }

  return {
    listCollaborators: listCollaborators,
    isCollaborator: isCollaborator,
    addCollaborator: addCollaborator,
    removeCollaborator: removeCollaborator
  };
};
