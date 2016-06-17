import React from 'react';

import { getPullRequestDetails, getAllPullRequests } from '../api/githubService';
import PullRequest from './PullRequest';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import Toolbar from './Toolbar';
import Footer from './Footer';

import config from '../../config/config.json';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: undefined,
      pullRequests: []
    };

    this.loadPullRequestData = this.loadPullRequestData.bind(this);
  }

  componentWillMount() {
    this.loadPullRequestData();
  }

  loadPullRequestData() {
    getAllPullRequests(config.repos).then(pullRequests => {
      this.setState({
        pullRequests,
        loading: false
      });
    }).then(() => getPullRequestDetails())
      .then(pullRequestDetails => {
        this.setState({
          pullRequests: pullRequestDetails
        });
      })
    .catch(error => {
      this.setState({
        error,
        loading: false
      });
    });
  }

  renderBody() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    } else if (this.state.error) {
      return <ErrorMessage message={this.state.error} />;
    }

    return (
      <div>
        {this.state.pullRequests.map(pullRequest =>
          <PullRequest key={pullRequest.id} pullRequest={pullRequest} />
        )}
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <h1>Open Pull Requests</h1>
        <Toolbar onRefresh={this.loadPullRequestData} />
        {this.renderBody()}
        <Footer />
      </div>
    );
  }
}

export default Main;
