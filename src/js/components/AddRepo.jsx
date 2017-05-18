import React from 'react';
import axios from 'axios';

export default class AddRepo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: '',
      repo: '',
      error: ''
    };

    this.handleChangeOwner = this.handleChangeOwner.bind(this);
    this.handleChangeRepo = this.handleChangeRepo.bind(this);
    this.addRepo = this.addRepo.bind(this);
  }

  handleChangeOwner(event) {
    this.setState({
      owner: event.target.value,
      error: ''
    });
  }

  handleChangeRepo(event) {
    this.setState({
      repo: event.target.value,
      error: ''
    });
  }

  addRepo(event) {
    event.preventDefault();

    const fullName = `${this.state.owner}/${this.state.repo}`;
    if (this.props.repos.indexOf(fullName) >= 0) {
      this.setState({
        error: 'That repository has already been added.'
      });
    } else {
      axios.get(`/repoExists?owner=${this.state.owner}&repo=${this.state.repo}`)
        .then(() => {
          this.props.onAddRepo(this.state.owner, this.state.repo);
          this.setState({
            owner: '',
            repo: '',
            error: ''
          });
          document.getElementById('ownerInput').focus();
        }).catch((error) => {
          if (error.response && error.response.status === 404) {
            this.setState({
              error: 'That repository does not exist.'
            });
          } else {
            /* eslint-disable no-console */
            console.error(error);
            this.setState({
              error: 'An unexpected error has occurred. Please try again.'
            });
          }
        });
    }
  }

  renderRepoError() {
    if (this.state.error) {
      return (
        <div className="edit-error">
          {this.state.error}
        </div>
      );
    }

    return <div />;
  }

  render() {
    return (
      <div>
        <h3>Add Repository</h3>
        <form onSubmit={this.addRepo} id="add-repo-form">
          {this.renderRepoError()}
          <input
            id="ownerInput"
            type="text" value={this.state.owner}
            onChange={this.handleChangeOwner} placeholder="Owner" size="20"
          />
          &nbsp;/&nbsp;
          <input
            type="text" value={this.state.repo}
            onChange={this.handleChangeRepo} placeholder="Repository" size="50"
          />
          <button disabled={!(this.state.owner.length && this.state.repo.length)}>Add</button>
        </form>
      </div>
    );
  }
}

AddRepo.propTypes = {
  repos: React.PropTypes.array.isRequired,
  onAddRepo: React.PropTypes.func.isRequired
};
