let fetch = require('isomorphic-fetch');
let helper = require('./helper');

module.exports = function(auth, url) {
  let headers = helper.makeHeader({}, 'Authorization', auth);

  function listCollaborators() {
    const _url = `${url}/collaborators`;

    return fetch(_url, {
      headers,
    }).then((res) => res.json());
  }

  function isCollaborator(username) {
    const _url = `${url}/collaborators/${username}`;

    return fetch(_url, {
      headers,
    }).then((res) => res.status === 204);
  }

  // TODO support permission of organization repos
  function addCollaborator(username) {
    const _url = `${url}/collaborators/${username}`;

    return fetch(_url, {
      method: 'PUT',
      headers,
    }).then((res) => res.status === 204);
  }

  function removeCollaborator(username) {
    const _url = `${url}/collaborators/${username}`;

    return fetch(_url, {
      method: 'DELETE',
      headers,
    }).then((res) => res.status === 204);
  }

  return {
    listCollaborators,
    isCollaborator,
    addCollaborator,
    removeCollaborator,
  };
};
