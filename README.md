# github-pr-dashboard
See pull requests at a glance, across multiple repos

# Configuration
Copy the file `src/config/config.json.sample` to `src/config/config.json`. If you are accessing public GitHub, you don't need to change the `apiBaseUrl` option. If you are accessing a GitHub Enterprise instance, you will need to set `apiBaseUrl` to the base URL of your GitHub Enterprise installation, e.g. `https://github.mycompany.com/api/v3`.

Under the `repos` option, list all the repositories from which you want to see pull requests. The repository should be given in the format `owner/repoName`, e.g. `joeattardi/github-pr-dashboard`.

# Screenshot
![](https://raw.githubusercontent.com/joeattardi/github-pr-dashboard/master/screenshot.png)
