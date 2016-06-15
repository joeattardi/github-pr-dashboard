import React from 'react';

export default class UserPhoto extends React.Component {
  render() {
    const url = this.props.user.avatar_url;
    const username = this.props.user.login;
    const size = this.props.size;
    const profileUrl = this.props.user.html_url;

    return (
      <div className="user-photo">
        <a target="_blank" href={profileUrl}><img width={size} height={size} src={url} alt={username} title={username} /></a>
      </div>
    );
  }
}

UserPhoto.defaultProps = {
  size: 40
};
