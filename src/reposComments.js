let fetch = require('isomorphic-fetch');
let helper = require('./helper');

module.exports = function(auth, url) {
  let headers = helper.makeHeader({}, 'Authorization', auth);

  function listComments(ref) {
    let _url = ref ? `${url}/commits/${ref}/comments` : `${url}/comments`;

    return fetch(_url, {
      headers,
    }).then((res) => res.json());
  }

  function createComment(sha, data = {}) {
    const _url = `${url}/commits/${sha}/comments`;

    return fetch(_url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  function getComment(id) {
    const _url = `${url}/comments/${id}`;

    return fetch(_url, {
      headers,
    }).then((res) => res.json());
  }

  function updateComment(id, data) {
    const _url = `${url}/comments/${id}`;

    return fetch(_url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  function deleteComment(id) {
    const _url = `${url}/comments/${id}`;

    return fetch(_url, {
      method: 'DELETE',
      headers,
    }).then((res) => res.status === 204);
  }

  return {
    listComments,
    createComment,
    getComment,
    updateComment,
    deleteComment,
  };
};
