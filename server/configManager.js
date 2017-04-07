const fs = require('fs');
const _ = require('lodash');

let config;

let neverMergeRegexp;

exports.loadConfig = function loadConfig() {
  config = JSON.parse(fs.readFileSync('config/config.json'));

  if (_.isString(config.mergeRule.neverRegexp)) {
    neverMergeRegexp = new RegExp(config.mergeRule.neverRegexp, 'i');
  }
};

exports.getConfig = function getConfig() {
  return config;
};

exports.hasMergeRules = function hasMergeRules() {
  return config.mergeRule &&
    _.isNumber(config.mergeRule.positive) &&
    _.isNumber(config.mergeRule.negative) &&
    _.isString(config.mergeRule.neverRegexp);
};

exports.getNeverMergeRegexp = function getNeverMergeRegexp() {
  return neverMergeRegexp;
}
