const express = require('express');

const configManager = require('./configManager');
const githubService = require('./githubService');

const app = express();

app.use(express.static('dist'));

configManager.loadConfig();

app.get('/pulls', getPullRequests);

console.log('GitHub PR Dashboard');
app.listen(3000, () => {
  console.log('Listening on port 3000');
});

function getPullRequests(req, res) {
  githubService.loadPullRequests().then(prs => {
    res.status(200).json(prs);  
  });
}
