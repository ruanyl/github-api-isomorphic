module.exports = function(authMiddleware, user, repo) {
  var reposCollaborators = require('./reposCollaborators')(authMiddleware, user, repo);

  return {
    ...reposCollaborators
  };
};
