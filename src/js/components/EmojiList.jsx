import React from 'react';

export default class EmojiList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newEmoji: '',
      error: ''
    };

    this.addEmoji = this.addEmoji.bind(this);
    this.removeEmoji = this.removeEmoji.bind(this);
    this.handleChangeNewEmoji = this.handleChangeNewEmoji.bind(this);
  }

  addEmoji() {
    if (this.props.emojis.indexOf(this.state.newEmoji) >= 0) {
      this.setState({
        error: 'That emoji has already been added.',
        newEmoji: ''
      });
    } else {
      this.props.onAdd(this.state.newEmoji);
      this.setState({ newEmoji: '' });
    }
  }

  removeEmoji(event) {
    this.props.onRemove(event.target.dataset.name);
  }

  handleChangeNewEmoji(event) {
    this.setState({
      newEmoji: event.target.value,
      error: ''
    });
  }

  renderError() {
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
        {this.renderError()}
        <div>
          {this.props.emojis.map(emoji =>
            <div className="item" key={emoji}>
              <code>{emoji}</code>
              &nbsp;
              <i className="fa fa-times" data-name={emoji} onClick={this.removeEmoji} />
            </div>
          )}
        </div>

        <form>
          <input type="text" value={this.state.newEmoji} onChange={this.handleChangeNewEmoji} />
          <button disabled={this.state.newEmoji === ''} onClick={this.addEmoji}>Add</button>
        </form>

      </div>
    );
  }
}

EmojiList.propTypes = {
  emojis: React.PropTypes.array.isRequired,
  onAdd: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
};
