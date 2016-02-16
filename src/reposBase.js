var fetch = require('isomorphic-fetch');
var helper = require('./helper');

module.exports = function(auth, url) {
  let headers = {};
  if(auth) {
    headers.Authorization = auth;
  }

  function listMyRepos(data) {
    if(Object.prototype.toString.apply(data) !== '[object Object]') {
      cb = data;
      data = {};
    }

    const _url = `${url}/user/repos`;
    const query = helper.toQueryString(data);

    return fetch(`${_url}?${query}`, {
      headers,
    }).then((res) => res.json());
  }

  function listUserRepos(username, data) {
    if(Object.prototype.toString.apply(data) !== '[object Object]') {
      cb = data;
      data = {};
    }

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
