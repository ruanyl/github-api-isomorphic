let fetch = require('isomorphic-fetch');
let helper = require('./helper');

module.exports = function(auth, url) {
  let headers = helper.makeHeader({}, 'Authorization', auth);
  /**
   * Details: https://developer.github.com/v3/repos/commits/#list-commits-on-a-repository
   */
  function listCommits(data = {}) {
    const _url = `${url}/commits`;
    const query = helper.toQueryString(data);

    return fetch(`${_url}?${query}`, {
      headers,
    }).then((res) => res.json());
  }

  function getCommit(sha) {
    const _url = `${url}/commits/${sha}`;

    return fetch(_url, {
      headers,
    }).then((res) => res.json());
  }

  /**
   * Details: https://developer.github.com/v3/repos/commits/#compare-two-commits
   * TODO: support media type
   * https://developer.github.com/v3/media/#commits-commit-comparison-and-pull-requests
   */
  function compareCommits(base, head) {
    const _url = `${url}/compare/${base}...${head}`;

    return fetch(_url, {
      headers,
    }).then((res) => res.json());
  }

  return {
    listCommits,
    getCommit,
    compareCommits,
  };
};
