import React from 'react';
import '../../css/loadingIndicator.css';

export default function LoadingIndicator(props) {
  const style = {
    width: props.size,
    height: props.size
  };

  return (
    <div className="sk-fading-circle" style={style}>
      <div className="sk-circle1 sk-circle"></div>
      <div className="sk-circle2 sk-circle"></div>
      <div className="sk-circle3 sk-circle"></div>
      <div className="sk-circle4 sk-circle"></div>
      <div className="sk-circle5 sk-circle"></div>
      <div className="sk-circle6 sk-circle"></div>
      <div className="sk-circle7 sk-circle"></div>
      <div className="sk-circle8 sk-circle"></div>
      <div className="sk-circle9 sk-circle"></div>
      <div className="sk-circle10 sk-circle"></div>
      <div className="sk-circle11 sk-circle"></div>
      <div className="sk-circle12 sk-circle"></div>
    </div>
  );
}

LoadingIndicator.propTypes = {
  size: React.PropTypes.number
};

LoadingIndicator.defaultProps = {
  size: 40
};
