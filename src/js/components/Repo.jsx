import React from 'react';
import GitHub from 'github-api';

class Repo extends React.Component {
  constructor(props) {
    super(props);

    const github = new GitHub({}, 'https://github.roving.com/api/v3');
    const repo = github.getRepo('ES', props.repo);

    this.state = {
      pullRequests: []
    }
    
    repo.listPullRequests().then(prs => {
      console.log(prs);
      this.setState({
        pullRequests: prs.data
      });
    });
  }

  render() {
    return (
      <li>
        {this.props.repo}
        <ul>
          {this.state.pullRequests.map(pr => {
            return <li>{pr.title}</li>;
          })}
        </ul>
      </li>
    );
  }
}

export default Repo;
