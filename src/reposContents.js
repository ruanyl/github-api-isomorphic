var request = require('superagent');

module.exports = function(authMiddleware, url) {
  // Details: https://developer.github.com/v3/repos/contents/#get-the-readme
  // Needs to support media types
  function getReadme(data, cb) {
    const _url = `${url}/readme`;

    if(Object.prototype.toString.apply(data) !== '[object Object]') {
      cb = data;
      data = {};
    }

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

  // Deails: https://developer.github.com/v3/repos/contents/#get-contents
  // Needs to support media types
  function getContents(path, data, cb) {
    if(Object.prototype.toString.apply(path) !== '[object String]') {
      cb = data;
      data = path;
      path = '';
    }

    if(Object.prototype.toString.apply(data) !== '[object Object]') {
      cb = data;
      data = {};
    }

    const _url = `${url}/contents/${path}`;

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

  // Deails: https://developer.github.com/v3/repos/contents/#create-a-file
  function createFile(path, data, cb) {
    if(Object.prototype.toString.apply(path) !== '[object String]') {
      cb = data;
      data = path;
      path = '';
    }

    if(Object.prototype.toString.apply(data) !== '[object Object]') {
      cb = data;
      data = {};
    }

    const _url = `${url}/contents/${path}`;

    request
      .put(_url)
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

  function updateFile(path, data, cb) {
    if(Object.prototype.toString.apply(path) !== '[object String]') {
      cb = data;
      data = path;
      path = '';
    }

    if(Object.prototype.toString.apply(data) !== '[object Object]') {
      cb = data;
      data = {};
    }

    const _url = `${url}/contents/${path}`;

    request
      .put(_url)
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

  function deleteFile(path, data, cb) {
    if(Object.prototype.toString.apply(path) !== '[object String]') {
      cb = data;
      data = path;
      path = '';
    }

    if(Object.prototype.toString.apply(data) !== '[object Object]') {
      cb = data;
      data = {};
    }

    const _url = `${url}/contents/${path}`;

    request
      .delete(_url)
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

  function getArchiveLink(archiveFormat, ref, cb) {
    if(Object.prototype.toString.apply(archiveFormat) !== '[object String]') {
      cb = ref;
      ref = archiveFormat;
      archiveFormat = 'tarball';
    }

    if(Object.prototype.toString.apply(ref) !== '[object String]') {
      cb = ref;
      ref = 'master';
    }

    const _url = `${url}/${archiveFormat}/${ref}`;

    request
      .get(_url)
      .use(authMiddleware)
      .on('redirect', function(res) {
        cb(null, res.headers.location);
      })
      .end(function(err, res) {
        if(err || !res.ok) {
          cb(err);
        }
      });
  }

  return {
    getReadme,
    getContents,
    createFile,
    updateFile,
    deleteFile,
    getArchiveLink
  };
};
