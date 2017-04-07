import React from 'react';

export default class FilterRepoDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'All' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.value === 'All') {
      this.props.onRefresh(undefined);
    } else {
      const repo = [this.state.value];
      this.props.onRefresh(repo);
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className="filter-repo-container">
        <label>
          <strong>Search By Repository:</strong>
          <select value={this.state.value} onChange={this.handleChange}>
            <option key={0} value="All">All</option>
            {this.props.allRepos
              .map(repo => <option key={repo} value={repo}>{repo}</option>)
            }
          </select>
        </label>
        <button
          id="search-button"
          className="btn btn-default btn-filter"
          type="button"
          onClick={this.handleSubmit}
        >
          <i className="fa fa-search"></i> Search
        </button>
      </div>
    );
  }
}

FilterRepoDropdown.propTypes = {
  failedRepos: React.PropTypes.array,
  onRefresh: React.PropTypes.func.isRequired,
  allRepos: React.PropTypes.array
};
