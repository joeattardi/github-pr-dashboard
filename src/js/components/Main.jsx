import React from 'react';
import { connect } from 'react-redux';
import config from '../../config/config.json';
import PullRequest from './PullRequest';
import LoadingOverlay from './LoadingOverlay';
import ErrorMessage from './ErrorMessage';
import Toolbar from './Toolbar';
import Footer from './Footer';
import RepoIndicator from './RepoIndicator';

let lastRepoId = null;

class Main extends React.Component {

  isToShow(currentId) {
    if (config.groupByRepo && (currentId !== lastRepoId)) {
      lastRepoId = currentId;
      return true;
    }
    return false;
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
        {this.props.failedRepos.map(failedRepo =>
          <ErrorMessage
            key={failedRepo}
            message={`Failed to load pull request data for ${failedRepo}.`}
          />
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
        {this.props.pullRequests.map(pr =>
          <div key={pr.id}>
            <RepoIndicator
              key={pr.repoId}
              pullRequest={pr}
              show={this.isToShow(pr.repoId)}
            />
            <PullRequest key={pr.id} pullRequest={pr} />
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="container-header">
          <h1>{this.props.pullRequests.length} Open Pull Requests</h1>
        </div>
        <Toolbar failedRepos={this.props.failedRepos} />
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
