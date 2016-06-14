import React from 'react';

export default class UserPhoto extends React.Component {
  render() {
    const url = this.props.user.avatar_url;
    const username = this.props.user.login;
    const size = this.props.size;

    return (
      <div>
        <img className="profile-picture" width={size} height={size} src={url} alt={username} title={username} />
      </div>
    );
  }
}

UserPhoto.defaultProps = {
  size: 40
};
