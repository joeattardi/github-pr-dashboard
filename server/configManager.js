const fs = require('fs');

let config;

exports.loadConfig = function loadConfig() {
  config = JSON.parse(fs.readFileSync('config/config.json'));
};

exports.getConfig = function getConfig() {
  return config;
};
