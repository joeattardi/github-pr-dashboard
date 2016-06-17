import $ from 'jquery';
import Promise from 'bluebird';
import Base64 from 'Base64';
import config from '../../config/config.json';

let pullRequestData = [];

function getBasicAuth() {
  const auth = `${config.username}:${config.password}`;
  const hash = Base64.btoa(auth);
  return `Basic ${hash}`;
}

function apiCall(url) {
  return $.get({
    url,
    beforeSend: xhr => {
      if (config.username && config.password) {
        xhr.setRequestHeader('Authorization', getBasicAuth());
      }
    }
  });
}

function loadPullRequest(owner, repo, number) {
  const url = `${config.apiBaseUrl}/repos/${owner}/${repo}/pulls/${number}`;
  return apiCall(url);
}

function loadPullRequests(owner, repo) {
  const url = `${config.apiBaseUrl}/repos/${owner}/${repo}/pulls`;
  return apiCall(url);
}

export function getAllPullRequests(repoNames) {
  const promises = repoNames.map(repoName => {
    const [owner, repo] = repoName.split('/');
    return loadPullRequests(owner, repo);
  });

  return Promise.all(promises).then(results => {
    let pullRequests = [];
    results.forEach(result => {
      pullRequests = pullRequests.concat(result);
    });

    pullRequestData = pullRequests.sort((a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );

    return pullRequestData;
  });
}

/* eslint no-param-reassign: 0 */
export function getPullRequestDetails() {
  const promises = pullRequestData.map(pullRequest => {
    const repo = pullRequest.base.repo;
    return loadPullRequest(repo.owner.login, repo.name, pullRequest.number)
      .then(pullRequestDetails => {
        pullRequest.comments = pullRequestDetails.comments;
      });
  });

  return Promise.all(promises).then(() => pullRequestData);
}

