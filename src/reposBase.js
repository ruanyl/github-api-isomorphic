let fetch = require('isomorphic-fetch');
let helper = require('./helper');

module.exports = function(auth, url) {
  let headers = {};
  if (auth) {
    headers.Authorization = auth;
  }

  function listMyRepos(data = {}) {
    const _url = `${url}/user/repos`;
    const query = helper.toQueryString(data);

    return fetch(`${_url}?${query}`, {
      headers,
    }).then((res) => res.json());
  }

  function listUserRepos(username, data = {}) {
    const _url = `${url}/users/${username}/repos`;
    const query = helper.toQueryString(data);

    return fetch(`${_url}?${query}`, {
      headers,
    }).then((res) => res.json());
  }

  return {
    listMyRepos,
    listUserRepos,
  };
};
