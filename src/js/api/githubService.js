import axios from 'axios';
import Promise from 'bluebird';
import config from '../../config/config.json';

const pullRequestData = {
  pullRequests: [],
  failedRepos: []
};

function apiCall(url, headers = {}) {
  const options = { headers };
  if (config.username) {
    options.auth = {
      username: config.username,
      password: config.password
    };
  }
  return axios.get(url, options);
}

function loadPullRequest(owner, repo, number) {
  const url = `${config.apiBaseUrl}/repos/${owner}/${repo}/pulls/${number}`;
  return apiCall(url);
}

function loadPullRequestComments(owner, repo, number) {
  if (typeof config.comments === 'undefined') {
    return Promise.resolve({
      data: []
    });
  }
  const url = `${config.apiBaseUrl}/repos/${owner}/${repo}/issues/${number}/comments`;
  return apiCall(url);
}

function loadPullRequestReactions(owner, repo, number) {
  if (config.reactions === false) {
    return Promise.resolve({
      data: []
    });
  }
  const url = `${config.apiBaseUrl}/repos/${owner}/${repo}/issues/${number}/reactions`;
  return apiCall(url, { Accept: 'application/vnd.github.squirrel-girl-preview' });
}

export function getPullRequestDetails(owner, repo, number) {
  return Promise.all([
    loadPullRequest(owner, repo, number),
    loadPullRequestComments(owner, repo, number),
    loadPullRequestReactions(owner, repo, number)
  ]).then(results => {
    const [pullRequest, comments, reactions] = results;
    return Object.assign(pullRequest.data, {
      computedComments: comments.data,
      computedReactions: reactions.data
    });
  });
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
        pullRequests = pullRequests.concat(result.value().data);
      }
    });

    pullRequests.sort((a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

    pullRequestData.pullRequests = pullRequests;
    return pullRequestData;
  });
}
