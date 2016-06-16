import $ from 'jquery';
import Promise from 'bluebird';
import config from '../../config/config.json';

let pullRequestData = [];

function loadPullRequest(owner, repo, number) {
  const url = `${config.apiBaseUrl}/repos/${owner}/${repo}/pulls/${number}`;
  return $.get({ url });
}

function loadPullRequests(owner, repo) {
  const url = `${config.apiBaseUrl}/repos/${owner}/${repo}/pulls`;
  return $.get({
    url
  });
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

