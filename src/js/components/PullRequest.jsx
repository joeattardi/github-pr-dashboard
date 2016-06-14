import React from 'react';

class PullRequest extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <div>
          <a target="_blank" href={this.props.pullRequest.html_url}>
            {this.props.pullRequest.title}
          </a> 
          <em>({this.props.pullRequest.base.repo.full_name})</em>
        </div>
        <div>
          Last update: {new Date(this.props.pullRequest.updated_at).toString()}
        </div>
      </div>
    );
  }
}

export default PullRequest;
