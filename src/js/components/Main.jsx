import React from 'react';
import { connect } from 'react-redux';

import PullRequest from './PullRequest';
import LoadingOverlay from './LoadingOverlay';
import ErrorMessage from './ErrorMessage';
import Toolbar from './Toolbar';
import Footer from './Footer';

class Main extends React.Component {
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
        {this.props.failedRepos.map(failedRepo =>
          <ErrorMessage message={`Failed to load pull request data for ${failedRepo}.`} />
        )}
      </div>
    );
  }

  renderBody() {
    if (this.props.error) {
      return <ErrorMessage message={this.props.error} />;
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
        <h1>{this.props.pullRequests.length} Open Pull Requests</h1>
        <Toolbar onRefresh={this.loadPullRequestData} />
        {this.renderBody()}
        <Footer />
      </div>
    );
  }
}

Main.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  pullRequests: React.PropTypes.array.isRequired,
  failedRepos: React.PropTypes.array.isRequired,
  error: React.PropTypes.string.isRequired
};

export default connect(state => state)(Main);
