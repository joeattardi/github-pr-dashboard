const express = require('express');

const configManager = require('./configManager');
const githubService = require('./githubService');
const emoji = require('./emoji');

const app = express();

app.use(express.static('dist'));

configManager.loadConfig();
emoji.init();

app.get('/pulls', getPullRequests);

const port = process.env.PORT || 8080;
console.log('GitHub PR Dashboard');
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
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
