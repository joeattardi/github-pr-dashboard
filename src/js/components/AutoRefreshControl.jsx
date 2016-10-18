import React from 'react';

const AUTO_REFRESH_ENABLED = 'autoRefreshEnabled';
const AUTO_REFRESH_TIME = 'autoRefreshTime';

export default class AutoRefreshControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.toggleAutoRefresh = this.toggleAutoRefresh.bind(this);
    this.setAutoRefreshTime = this.setAutoRefreshTime.bind(this);
    this.scheduleAutoRefresh = this.scheduleAutoRefresh.bind(this);
    this.cancelAutoRefresh = this.cancelAutoRefresh.bind(this);
  }

  componentDidMount() {
    const autoRefreshEnabled = JSON.parse(localStorage.getItem(AUTO_REFRESH_ENABLED));
    const autoRefreshInterval = JSON.parse(localStorage.getItem(AUTO_REFRESH_TIME));


    if (autoRefreshInterval) {
      this.refs.autoRefreshTime.value = autoRefreshInterval;
    }

    this.refs.autoRefreshCheckbox.checked = autoRefreshEnabled;

    this.toggleAutoRefresh();
  }

  setAutoRefreshTime() {
    this.scheduleAutoRefresh(this.refs.autoRefreshTime.value);
    localStorage.setItem(AUTO_REFRESH_TIME, this.refs.autoRefreshTime.value);
  }

  cancelAutoRefresh() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
      this.setState({ interval: undefined });
    }
  }

  scheduleAutoRefresh(minutes) {
    this.cancelAutoRefresh();

    this.setState({
      interval: setInterval(this.props.onRefresh, minutes * 1000 * 60)
    });
  }

  toggleAutoRefresh() {
    const select = this.refs.autoRefreshTime;
    const enabled = this.refs.autoRefreshCheckbox.checked;
    select.disabled = !enabled;

    localStorage.setItem(AUTO_REFRESH_ENABLED, enabled);

    if (enabled) {
      this.scheduleAutoRefresh(select.value);
    } else {
      this.cancelAutoRefresh();
    }
  }

  render() {
    return (
      <div id="auto-refresh-container">
        <input
          type="checkbox"
          ref="autoRefreshCheckbox"
          id="auto-refresh"
          onClick={this.toggleAutoRefresh}
        />
        <label htmlFor="auto-refresh"><strong>Auto-refresh every</strong></label>
        <select
          onChange={this.setAutoRefreshTime}
          id="auto-refresh-time"
          ref="autoRefreshTime"
          disabled="disabled"
        >
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>30</option>
          <option>60</option>
        </select>
        <strong>minutes</strong>
      </div>
    );
  }
}

AutoRefreshControl.propTypes = {
  onRefresh: React.PropTypes.func.isRequired
};
