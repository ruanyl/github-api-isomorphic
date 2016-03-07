let fetch = require('isomorphic-fetch');
let helper = require('./helper');

module.exports = function(auth, url) {
  let headers = helper.makeHeader({}, 'Authorization', auth);

  function listForks(data = {}) {
    const _url = `${url}/forks`;
    const query = helper.toQueryString(data);

    return fetch(`${_url}?${query}`, {
      headers,
    }).then((res) => res.json());
  }

  function createForks(data = {}) {
    const _url = `${url}/forks`;

    return fetch(_url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  return {
    listForks,
    createForks,
  };
};
