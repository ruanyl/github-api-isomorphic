var request = require('superagent');

module.exports = function(authMiddleware, url) {
  function listComments(ref, cb) {
    let _url = '';
    if(Object.prototype.toString.apply(ref) === '[object String]') {
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

  return {
    listComments: listComments
  };
};
