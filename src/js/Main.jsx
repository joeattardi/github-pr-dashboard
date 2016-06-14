import React from 'react';

import {getAllPullRequests} from './githubService';
import PullRequest from './components/PullRequest';
import config from '../config/config.json';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      pullRequests: []
    };
  }

  componentWillMount() {
    getAllPullRequests(config.repos).then(pullRequests => {
      this.setState({
        pullRequests
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Pull Requests</h1>
        {this.state.pullRequests.map(pullRequest => {
          return <PullRequest key={pullRequest.id} pullRequest={pullRequest} />;
        })}
      </div>
    );
  }
}

export default Main;
