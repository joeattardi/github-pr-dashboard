const configManager = require('./configManager');
const githubService = require('./githubService');

exports.getPullRequests = function getPullRequests(req, res) {
  const config = configManager.getConfig();
  githubService
    .loadPullRequests()
    .then(prs => {
      res.status(200).json({
        pullRequests: prs,
        repos: config.repos,
        title: config.title
      });
    })
    .catch(error => {
      console.error(`Error loading pull requests: ${error.message}`);
      console.error(error);
      res.status(500).json({
        error: `Failed to load pull requests: ${error.message}`
      });
    });
};

exports.getConfig = function getConfig(req, res) {
  const config = configManager.getConfig();
  const sanitisedConfig = Object.assign({}, config);

  sanitisedConfig.username = '';
  sanitisedConfig.password = '';
  sanitisedConfig.token = '';

  res.status(200).json(sanitisedConfig);
};

exports.updateConfig = function updateConfig(req, res) {
  configManager.updateConfig(req.body);
  res.status(200).json('updated');
};

exports.repoExists = function getConfig(req, res) {
  githubService
    .getRepo(req.query.owner, req.query.repo)
    .then(() => {
      res.status(200).json(true);
    })
    .catch(() => {
      res.status(404).json(false);
    });
};

exports.scanOrgRepos = function scanOrgRepos(req, res) {
  githubService.listOrganizationRepos(req.query.owner).then(repos => {
    res.status(200).json(repos.map(repo => ({ id: repo.id, name: repo.name })));
  }).catch(error => {
    console.error(`Error loading organization repos: ${error.message}`);
    console.error(error);
    res.status(500).json({
      error: `Failed to load organization repos: ${error.message}`
    });
  });
};
