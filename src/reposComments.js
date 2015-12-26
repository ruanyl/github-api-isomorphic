var request = require('superagent');

module.exports = function(authMiddleware, url) {
  function listComments(ref, cb) {
    let _url = '';
    if(Object.prototype.toString.apply(ref) !== '[object Function]') {
      _url = `${url}/commits/${ref}/comments`;
    } else {
      _url = `${url}/comments`;
      cb = ref;
    }

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

  function createComment(sha, data, cb) {
    const _url = `${url}/commits/${sha}/comments`;

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

  function getComment(id, cb) {
    const _url = `${url}/comments/${id}`;

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

  function updateComment(id, data, cb) {
    const _url = `${url}/comments/${id}`;

    request
      .patch(_url)
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

  function deleteComment(id, cb) {
    const _url = `${url}/comments/${id}`;

    request
      .del(_url)
      .use(authMiddleware())
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
    listComments,
    createComment,
    getComment,
    updateComment,
    deleteComment
  };
};
