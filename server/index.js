const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const configManager = require('./configManager');
const emoji = require('./emoji');
const requestHandlers = require('./requestHandlers');

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json());

configManager.loadConfig();
emoji.init();

app.get('/pulls', requestHandlers.getPullRequests);
app.get('/config', requestHandlers.getConfig);
app.get('/repoExists', requestHandlers.repoExists);
app.put('/config', requestHandlers.updateConfig);
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});

const port = process.env.PORT || 8080;
console.log('GitHub PR Dashboard');
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
