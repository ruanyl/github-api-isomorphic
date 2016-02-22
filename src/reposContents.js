let fetch = require('isomorphic-fetch');
let helper = require('./helper');

module.exports = function(auth, url) {
  let headers = helper.makeHeader({}, 'Authorization', auth);

  // Details: https://developer.github.com/v3/repos/contents/#get-the-readme
  // Needs to support media types
  function getReadme(data = {}) {
    const _url = `${url}/readme`;
    const query = helper.toQueryString(data);

    return fetch(`${_url}?${query}`, {
      headers,
    }).then((res) => res.json());
  }

  // Deails: https://developer.github.com/v3/repos/contents/#get-contents
  // Needs to support media types
  function getContents(path = '', data = {}) {
    const _url = `${url}/contents/${path}`;
    const query = helper.toQueryString(data);

    return fetch(`${_url}?${query}`, {
      headers,
    }).then((res) => res.json());
  }

  // Deails: https://developer.github.com/v3/repos/contents/#create-a-file
  function createFile(path = '', data = {}) {
    const _url = `${url}/contents/${path}`;

    return fetch(_url, {
      headers,
      method: 'PUT',
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  function updateFile(path = '', data = {}) {
    const _url = `${url}/contents/${path}`;

    return fetch(_url, {
      headers,
      method: 'PUT',
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  function deleteFile(path = '', data = {}) {
    const _url = `${url}/contents/${path}`;

    return fetch(_url, {
      headers,
      method: 'DELETE',
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  function getArchiveLink(archiveFormat = 'tarball', ref = 'master') {
    const _url = `${url}/${archiveFormat}/${ref}`;

    return fetch(_url, {
      headers,
    }).then((res) => res.url);
  }

  return {
    getReadme,
    getContents,
    createFile,
    updateFile,
    deleteFile,
    getArchiveLink,
  };
};
