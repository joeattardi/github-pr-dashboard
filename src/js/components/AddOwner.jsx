import React from 'react';
import axios from 'axios';

export default class AddOwner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: '',
      error: ''
    };

    this.handleChangeOwner = this.handleChangeOwner.bind(this);
    this.handleChangeOwner = this.handleChangeOwner.bind(this);
    this.addOwner = this.addOwner.bind(this);
  }

  handleChangeOwner(event) {
    this.setState({
      owner: event.target.value,
      error: ''
    });
  }

  addOwner(event) {
    event.preventDefault();

    if (this.props.owners.indexOf(this.state.owner) >= 0) {
      this.setState({
        error: 'That user/organization has already been added.'
      });
    } else {
      axios.get(`/ownerExists?owner=${this.state.owner}`)
        .then(() => {
          this.props.onAddOwner(this.state.owner);
          this.setState({
            owner: '',
            error: ''
          });
          document.getElementById('ownerInput').focus();
        }).catch((error) => {
          if (error.response && error.response.status === 404) {
            this.setState({
              error: 'That user/organization does not exist.'
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

  renderOwnerError() {
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
        <h3>Add User or Organization</h3>
        <form onSubmit={this.addOwner} id="add-owner-form">
          {this.renderOwnerError()}
          <input
            id="ownerInput"
            type="text" value={this.state.owner}
            onChange={this.handleChangeOwner} placeholder="User or Organization" size="50"
          />
          <button disabled={!this.state.owner.length}>Add</button>
        </form>
      </div>
    );
  }
}

AddOwner.propTypes = {
  owners: React.PropTypes.array.isRequired,
  onAddOwner: React.PropTypes.func.isRequired
};
