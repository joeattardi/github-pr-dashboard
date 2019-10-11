const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const emoji = require('./emoji');

let config;

let neverMergeRegexp;

exports.loadConfig = function loadConfig() {
  config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/config.json')));

  if (_.isString(config.mergeRule.neverRegexp)) {
    neverMergeRegexp = new RegExp(config.mergeRule.neverRegexp, 'i');
  }
};

exports.updateConfig = function updateConfig(updatedConfig) {
  config.title = updatedConfig.title;
  config.repos = updatedConfig.repos;
  config.owners = updatedConfig.owners;
  config.comments = updatedConfig.comments;
  config.mergeRule = updatedConfig.mergeRule;
  config.staleHours = updatedConfig.staleHours;
  neverMergeRegexp = new RegExp(updatedConfig.mergeRule.neverRegexp, 'i');
  emoji.init();

  fs.writeFileSync(path.join(__dirname, '../config/config.json'), JSON.stringify(config));
};

exports.getConfig = function getConfig() {
  return config;
};

exports.hasMergeRules = function hasMergeRules() {
  return config.mergeRule &&
    _.isNumber(config.mergeRule.positive) &&
    _.isNumber(config.mergeRule.negative) &&
    _.isString(config.mergeRule.neverRegexp) &&
    _.isNumber(config.mergeRule.staleHours);
};

exports.getNeverMergeRegexp = function getNeverMergeRegexp() {
  return neverMergeRegexp;
};
