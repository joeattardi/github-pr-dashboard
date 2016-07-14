import React from 'react';
import { connect } from 'react-redux';

import { getPullRequestDetails, getAllPullRequests } from '../api/githubService';
import PullRequest from './PullRequest';
import LoadingOverlay from './LoadingOverlay';
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
      failedRepos: [],
      pullRequests: []
    };

    this.loadPullRequestData = this.loadPullRequestData.bind(this);
    this.updatePullRequestDetails = this.updatePullRequestDetails.bind(this);
  }

  loadPullRequestData() {
    this.setState({
      loading: true
    });

    getAllPullRequests(config.repos).then(pullRequests => {
      if (pullRequests.failedRepos.length === config.repos.length) {
        this.setState({
          error: 'An error occurred while loading the pull request data.',
          loading: false
        });
      } else {
        this.setState({
          pullRequests: pullRequests.pullRequests,
          failedRepos: pullRequests.failedRepos,
          loading: false
        });
      }
    }).then(() => getPullRequestDetails(this.updatePullRequestDetails))
      .then(pullRequestDetails => {
        this.setState({
          pullRequests: pullRequestDetails.pullRequests
        });
      })
      .catch(() => {
        this.setState({
          error: 'An error occurred while loading the pull request data.',
          loading: false
        });
      });
  }

  updatePullRequestDetails(pullRequestData) {
    this.setState({
      pullRequests: pullRequestData.pullRequests
    });
  }

  renderLoading() {
    if (this.props.loading) {
      return (
        <LoadingOverlay />
      );
    }

    return <div></div>;
  }

  renderFailedRepos() {
    return (
      <div>
        {this.state.failedRepos.map(failedRepo =>
          <ErrorMessage message={`Failed to load pull request data for ${failedRepo}.`} />
        )}
      </div>
    );
  }

  renderBody() {
    if (this.state.error) {
      return <ErrorMessage message={this.state.error} />;
    }

    return (
      <div>
        {this.renderFailedRepos()}
        {this.renderLoading()}
        {this.props.pullRequests.map(pullRequest =>
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

Main.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  pullRequests: React.PropTypes.array.isRequired
};

export default connect(state => state)(Main);
