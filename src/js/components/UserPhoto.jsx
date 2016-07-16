import React from 'react';

export default function UserPhoto(props) {
  const url = props.user.avatar_url;
  const username = props.user.login;
  const size = props.size;
  const profileUrl = props.user.html_url;

  const linkStyle = { height: `${size}px` };

  return (
    <div className="user-photo">
      <a target="_blank" href={profileUrl} style={linkStyle}>
        <img width={size} height={size} src={url} alt={username} title={username} />
      </a>
    </div>
  );
}

UserPhoto.propTypes = {
  user: React.PropTypes.object,
  size: React.PropTypes.number
};

UserPhoto.defaultProps = {
  size: 40
};
