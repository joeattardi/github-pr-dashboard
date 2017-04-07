const express = require('express');

const configManager = require('./configManager');
const emoji = require('./emoji');
const requestHandlers = require('./requestHandlers');

const app = express();

app.use(express.static('dist'));

configManager.loadConfig();
emoji.init();

app.get('/pulls', requestHandlers.getPullRequests);

const port = process.env.PORT || 8080;
console.log('GitHub PR Dashboard');
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
