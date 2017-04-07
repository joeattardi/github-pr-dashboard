const express = require('express');

const configManager = require('./configManager');
const githubService = require('./githubService');
const emoji = require('./emoji');

const app = express();

app.use(express.static('dist'));

configManager.loadConfig();
emoji.init();

app.get('/pulls', getPullRequests);

console.log('GitHub PR Dashboard');
app.listen(3000, () => {
  console.log('Listening on port 3000');
});

function getPullRequests(req, res) {
  const config = configManager.getConfig();
  githubService.loadPullRequests().then(prs => {
    res.status(200).json({
      pullRequests: prs,
      repos: config.repos,
      title: config.title
    });
  });
}
