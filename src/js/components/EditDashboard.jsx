import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { refresh, loadPullRequests } from '../actions';

import AddRepo from './AddRepo';
import AddOwner from './AddOwner';
import EmojiList from './EmojiList';

class EditDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      config: {
        title: '',
        repos: [],
        owners: [],
        comments: {
          positive: [],
          negative: []
        },
        mergeRule: {
          positive: 0,
          negative: 0,
          staleHours: 0,
          neverRegexp: ''
        }
      }
    };

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.addRepo = this.addRepo.bind(this);
    this.removeRepo = this.removeRepo.bind(this);
    this.addOwner = this.addOwner.bind(this);
    this.removeOwner = this.removeOwner.bind(this);
    this.saveConfig = this.saveConfig.bind(this);
    this.cancel = this.cancel.bind(this);
    this.addPositive = this.addPositive.bind(this);
    this.removePositive = this.removePositive.bind(this);
    this.addNegative = this.addNegative.bind(this);
    this.removeNegative = this.removeNegative.bind(this);
    this.handleChangePositiveMergeRule = this.handleChangePositiveMergeRule.bind(this);
    this.handleChangeNegativeMergeRule = this.handleChangeNegativeMergeRule.bind(this);
    this.handleChangeStaleHours = this.handleChangeStaleHours.bind(this);
    this.handleChangeNeverRegexp = this.handleChangeNeverRegexp.bind(this);
  }

  componentDidMount() {
    axios.get('/config').then(response => {
      this.setState({ config: response.data });
    });
  }

  handleChangePositiveMergeRule(event) {
    this.state.config.mergeRule.positive = parseInt(event.target.value, 10);
    this.setState({ config: this.state.config });
  }

  handleChangeNegativeMergeRule(event) {
    this.state.config.mergeRule.negative = parseInt(event.target.value, 10);
    this.setState({ config: this.state.config });
  }

  handleChangeStaleHours(event) {
    this.state.config.mergeRule.staleHours = parseInt(event.target.value, 10);
    this.setState({ config: this.state.config });
  }

  handleChangeNeverRegexp(event) {
    this.state.config.mergeRule.neverRegexp = event.target.value;
    this.setState({ config: this.state.config });
  }

  handleChangeTitle(event) {
    this.state.config.title = event.target.value;
    this.setState({
      config: this.state.config
    });
  }

  addRepo(owner, repo) {
    this.state.config.repos.push(`${owner}/${repo}`);
    this.setState({
      config: this.state.config
    });
  }

  removeRepo(event) {
    const repo = event.target.dataset.name;
    this.state.config.repos = this.state.config.repos.filter(r => r !== repo);
    this.setState({
      config: this.state.config
    });
  }

  addOwner(owner) {
    this.state.config.owners.push(`${owner}`);
    this.setState({
      config: this.state.config
    });
  }

  removeOwner(event) {
    const owner = event.target.dataset.name;
    this.state.config.owners = this.state.config.owners.filter(r => r !== owner);
    this.setState({
      config: this.state.config
    });
  }

  addPositive(emoji) {
    this.state.config.comments.positive.push(emoji);
    this.setState({
      config: this.state.config
    });
  }

  removePositive(emoji) {
    this.state.config.comments.positive =
      this.state.config.comments.positive.filter(e => e !== emoji);
    this.setState({
      config: this.state.config
    });
  }

  addNegative(emoji) {
    this.state.config.comments.negative.push(emoji);
    this.setState({
      config: this.state.config
    });
  }

  removeNegative(emoji) {
    this.state.config.comments.negative =
      this.state.config.comments.negative.filter(e => e !== emoji);
    this.setState({
      config: this.state.config
    });
  }

  saveConfig() {
    axios.put('/config', this.state.config)
      .then(() => {
        this.props.history.push('/');
        this.props.refresh();
      });
  }

  cancel() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div id="edit-dashboard" className="container">
        <div className="container-header">
          <h1>Settings</h1>
        </div>
        <div className="content">
          <div>
            <h2>General</h2>
            <div><label htmlFor="boardTitle">Dashboard Title</label></div>
            <input
              type="text" id="boardTitle"
              value={this.state.config.title} onChange={this.handleChangeTitle}
            />
          </div>

          <div>
            <h2>User or Organization</h2>

            {this.state.config.owners.map(owner =>
              <div className="item" key={owner}>
                <img role="presentation" src="images/repo.svg" />
                &nbsp;
                {owner}
                &nbsp;
                <i className="fa fa-times" data-name={owner} onClick={this.removeOwner} />
              </div>
            )}

            <AddOwner owners={this.state.config.owners} onAddOwner={this.addOwner} />
          </div>

          <div>
            <h2>Repositories</h2>

            {this.state.config.repos.map(repo =>
              <div className="item" key={repo}>
                <img role="presentation" src="images/repo.svg" />
                &nbsp;
                {repo}
                &nbsp;
                <i className="fa fa-times" data-name={repo} onClick={this.removeRepo} />
              </div>
            )}

            <AddRepo repos={this.state.config.repos} onAddRepo={this.addRepo} />
          </div>

          <div>
            <h2>Comments</h2>
            <p>
              Specify comments in the GitHub emoji format, e.g. <code>:+1:</code>
              or <code>:cactus:</code>.
            </p>
            For a full list, see <a target="_blank" href="https://www.webpagefx.com/tools/emoji-cheat-sheet/">this page</a>.

            <h3>Positive Comments</h3>
            <EmojiList
              emojis={this.state.config.comments.positive}
              onAdd={this.addPositive}
              onRemove={this.removePositive}
            />

            <h3>Negative Comments</h3>
            <EmojiList
              emojis={this.state.config.comments.negative}
              onAdd={this.addNegative}
              onRemove={this.removeNegative}
            />
          </div>

          <div>
            <h2>Merge Rules</h2>

            <div><label htmlFor="positiveMerge">Minimum Positive Comments</label></div>
            <input
              type="number" id="positiveMerge" value={this.state.config.mergeRule.positive}
              onChange={this.handleChangePositiveMergeRule}
            />

            <div><label htmlFor="negativeMerge">Maximum Negative Comments</label></div>
            <input
              type="number" id="negativeMerge" value={this.state.config.mergeRule.negative}
              onChange={this.handleChangeNegativeMergeRule}
            />

            <div><label htmlFor="staleHours">Hours Till PR is Stale</label></div>
            <input
              type="number" id="staleHours" value={this.state.config.mergeRule.staleHours}
              onChange={this.handleChangeStaleHours}
            />

            <div><label htmlFor="neverMerge">Never merge regexp</label></div>
            <input
              type="text" id="neverMerge" value={this.state.config.mergeRule.neverRegexp}
              onChange={this.handleChangeNeverRegexp}
            />
          </div>

          <hr />
          <div style={{ margin: '1em' }}>
            <button onClick={this.saveConfig}>Save</button>
            <button onClick={this.cancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

EditDashboard.propTypes = {
  history: React.PropTypes.object.isRequired,
  refresh: React.PropTypes.func.isRequired
};

function mapStateToProps(state) { return state; }

function mapDispatchToProps(dispatch) {
  return {
    refresh: () => {
      dispatch(refresh());
      dispatch(loadPullRequests());
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditDashboard));
