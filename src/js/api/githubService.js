import $ from 'jquery';
import Promise from 'bluebird';
import Base64 from 'Base64';
import config from '../../config/config.json';

const pullRequestData = {
  pullRequests: [],
  failedRepos: []
};

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
  const promise = apiCall(url);
  promise.catch(() => pullRequestData.failedRepos.push(`${owner}/${repo}`));
  return promise;
}

export function getAllPullRequests(repoNames) {
  pullRequestData.failedRepos = [];

  const promises = repoNames.map(repoName => {
    const [owner, repo] = repoName.split('/');
    return Promise.resolve(loadPullRequests(owner, repo)).reflect();
  });

  return Promise.all(promises).then(results => {
    let pullRequests = [];

    results.forEach(result => {
      if (result.isFulfilled()) {
        pullRequests = pullRequests.concat(result.value());
      }
    });

    pullRequestData.pullRequests = pullRequests.sort((a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

    return pullRequestData;
  });
}

/* eslint no-param-reassign: 0 */
export function getPullRequestDetails(progressCallback) {
  const promises = pullRequestData.pullRequests.map(pullRequest => {
    const repo = pullRequest.base.repo;
    return Promise.resolve(loadPullRequest(repo.owner.login, repo.name, pullRequest.number))
      .reflect()
      .then(result => {
        if (result.isFulfilled()) {
          pullRequest.comments = result.value().comments;
          progressCallback(pullRequestData);
        }
      });
  });

  return Promise.all(promises).then(() => pullRequestData);
}

