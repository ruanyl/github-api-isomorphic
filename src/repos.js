var helper = require('./helper');

module.exports = function(authMiddleware, user, repo) {
  var url = helper.apiRoot + '/repos/' + user + '/' + repo;
  var reposCollaborators = require('./reposCollaborators')(authMiddleware, url);
  var reposComments = require('./reposComments')(authMiddleware, url);
  var reposCommits = require('./reposCommits')(authMiddleware, url);
  var reposDeployKeys = require('./reposDeployKeys')(authMiddleware, url);
  var reposContents = require('./reposContents')(authMiddleware, url);
  var reposForks = require('./reposForks')(authMiddleware, url);
  var reposReleases = require('./reposReleases')(authMiddleware, url);
  const reposBase = require('./reposBase')(authMiddleware, helper.apiRoot);

  return {
    ...reposCollaborators,
    ...reposComments,
    ...reposCommits,
    ...reposDeployKeys,
    ...reposContents,
    ...reposForks,
    ...reposReleases,
    ...reposBase,
  };
};
