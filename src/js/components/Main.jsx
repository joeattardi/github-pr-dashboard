import React from 'react';

import {getAllPullRequests} from '../githubService';
import PullRequest from './PullRequest';
import LoadingIndicator from './LoadingIndicator';
import config from '../../config/config.json';

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
        pullRequests,
        loading: false
      });
    });
  }

  renderBody() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    } else {
      return (
        <div>
          {this.state.pullRequests.map(pullRequest => {
            return <PullRequest key={pullRequest.id} pullRequest={pullRequest} />;
          })}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Open Pull Requests</h1>
        {this.renderBody()}
      </div>
    );
  }
}

export default Main;
