let fetch = require('isomorphic-fetch');
let helper = require('./helper');

module.exports = function(auth, url) {
  let headers = helper.makeHeader({}, 'Authorization', auth);

  function listDeployKeys() {
    const _url = `${url}/keys`;

    return fetch(_url, {
      headers,
    }).then((res) => res.json());
  }

  function getDeployKey(id) {
    const _url = `${url}/keys/${id}`;

    return fetch(_url, {
      headers,
    }).then((res) => res.json());
  }

  // Details: https://developer.github.com/v3/repos/keys/#add-a-new-deploy-key
  // Success: Status 201
  function addDeployKey(data) {
    const _url = `${url}/keys`;

    return fetch(_url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  function removeDeployKey(id) {
    const _url = `${url}/keys/${id}`;

    return fetch(_url, {
      method: 'DELETE',
      headers,
    }).then((res) => res.status === 204);
  }

  return {
    listDeployKeys,
    getDeployKey,
    addDeployKey,
    removeDeployKey,
  };
};
