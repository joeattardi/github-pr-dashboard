const axios = require('axios');
const _ = require('lodash');

const configManager = require('./configManager');

function getPullRequests(repos) {
  const config = configManager.getConfig();

  let pullRequests = [];
  const promises = repos.map(repo => axios.get(`${config.apiBaseUrl}/repos/${repo}/pulls`));
  return Promise.all(promises).then(results => {
    results.forEach(result => {
      pullRequests = pullRequests.concat(result.data);
    });

    return pullRequests.map(pr => ({
      url: pr.html_url,
      id: pr.id,
      number: pr.number,
      title: pr.title,
      repo: pr.base.repo.full_name,
      repoUrl: pr.base.repo.html_url,
      repoId: pr.base.repo.id,
      user: {
        username: pr.user.login,
        profileUrl: pr.user.html_url,
        avatarUrl: pr.user.avatar_url
      },
      created: pr.created_at,
      updated: pr.updated_at,
      comments_url: pr.comments_url,
      statuses_url: pr.statuses_url
    }));
  });
}

function getPullRequestComment(pr) {
  return axios.get(pr.comments_url).then(comments => {
    pr.comments = comments.data.map(comment => ({
      body: comment.body,
      user: comment.user.login
    }));
    delete pr.comments_url;
  });
}

function getPullRequestReactions(pr) {
  const config = configManager.getConfig();
  return axios.get(`${config.apiBaseUrl}/repos/${pr.repo}/issues/${pr.number}/reactions`, { headers: { Accept: 'application/vnd.github.squirrel-girl-preview' } }).then(reactions => {
    pr.reactions = reactions.data.map(reaction => ({
      user: reaction.user.login,
      content: reaction.content
    }));
  });
}

function getPullRequestStatus(pr) {
  const config = configManager.getConfig();
  return axios.get(pr.statuses_url).then(statuses => {
    if (statuses.data.length) {
      pr.status = {
        state: statuses.data[0].state,
        description: statuses.data[0].description
      }
    }
    delete pr.statuses_url;
  });
}

exports.loadPullRequests = function loadPullRequests() {
  const config = configManager.getConfig();
  const repos = config.repos;

  return getPullRequests(repos).then(prs => {
    const commentsPromises = prs.map(pr => getPullRequestComment(pr));
    return Promise.all(commentsPromises).then(() => prs);
  })
  .then(prs => {
    const reactionsPromises = prs.map(pr => getPullRequestReactions(pr));
    return Promise.all(reactionsPromises).then(() => prs);
  })
  .then(prs => {
    const statusPromises = prs.map(pr => getPullRequestStatus(pr));
    return Promise.all(statusPromises).then(() => {
      console.log('sorting');
      prs.sort((p1, p2) => new Date(p2.updated).getTime() - new Date(p1.updated).getTime());
      return prs;
    });
  })
  .catch(err => {
    console.log(err);
  });
};
