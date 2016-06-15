import React from 'react';

import {getAllPullRequests} from '../api/githubService';
import PullRequest from './PullRequest';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

import config from '../../config/config.json';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: undefined,
      pullRequests: []
    };
  }

  componentWillMount() {
    getAllPullRequests(config.repos).then(pullRequests => {
      this.setState({
        pullRequests,
        loading: false
      });
    }).catch(error => {
      this.setState({
        error: error.responseJSON.message,
        loading: false
      });
    });
  }

  renderBody() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    } else if (this.state.error) {
      return <ErrorMessage message={this.state.error} />;
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
