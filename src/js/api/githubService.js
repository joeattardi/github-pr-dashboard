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

export function loadPullRequest(owner, repo, number) {
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
        pullRequests = pullRequests.concat(result.value().data);
      }
    });

    pullRequestData.pullRequests = pullRequests.sort((a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

    return pullRequestData;
  });
}

