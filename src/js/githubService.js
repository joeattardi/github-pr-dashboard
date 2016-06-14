import GitHub from 'github-api';

const github = new GitHub({}, 'https://github.roving.com/api/v3');

export function getAllPullRequests(repoNames) {
  const repoObjects = repoNames.map(repoName => {
    const [owner, repo] = repoName.split('/');
    return github.getRepo(owner, repo);
  });

  const promises = repoObjects.map(repo => repo.listPullRequests());

  return Promise.all(promises).then(results => {
    let pullRequests = [];
    results.forEach(result => {
      pullRequests = pullRequests.concat(result.data);
    });
    console.log(pullRequests);
    return pullRequests.sort((a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  });
}
