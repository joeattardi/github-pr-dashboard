import axios from 'axios';
import Promise from 'bluebird';
import config from '../../config/config.json';

const pullRequestData = {
  pullRequests: [],
  failedRepos: []
};

function apiCall(url) {
  return axios.get(url, {
    auth: {
      username: config.username,
      password: config.password
    }
  });
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

export function getPullRequestDetails(owner, repo, number) {
  return Promise.all([
    loadPullRequest(owner, repo, number),
    loadPullRequestComments(owner, repo, number)
  ]).then(results => {
    const [pullRequest, comments] = results;
    return Object.assign(pullRequest.data, {
      computedComments: comments.data
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

    return Promise.map(pullRequests, pullRequest => {
      const [owner, repo] = pullRequest.base.repo.full_name.split('/');
      return loadPullRequestComments(owner, repo, pullRequest.number);
    }).then(comments => {
      pullRequestData.pullRequests = pullRequests.map((pullRequest, index) => {
        const newPullRequest = Object.assign(pullRequest, {
          computedComments: comments[index].data
        });
        return newPullRequest;
      });
      return pullRequestData;
    });
  });
}
