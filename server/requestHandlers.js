const configManager = require('./configManager');
const githubService = require('./githubService');

exports.getPullRequests = function getPullRequests(req, res) {
  const config = configManager.getConfig();
  githubService.loadPullRequests().then(prs => {
    res.status(200).json({
      pullRequests: prs,
      repos: config.repos,
      title: config.title
    });
  }).catch(error => {
    console.error(`Error loading pull requests: ${error.message}`);
    console.error(error);
    res.status(500).json({
      error: `Failed to load pull requests: ${error.message}`
    });
  });
};

exports.getConfig = function getConfig(req, res) {
  const config = configManager.getConfig();
  res.status(200).json(config);
};

exports.updateConfig = function updateConfig(req, res) {
  configManager.updateConfig(req.body);
  res.status(200).json('updated');
};

exports.repoExists = function getConfig(req, res) {
  githubService.getRepo(req.query.owner, req.query.repo).then(() => {
    res.status(200).json(true);
  }).catch(() => {
    res.status(404).json(false);
  });
};
