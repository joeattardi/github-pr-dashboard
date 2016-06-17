import React from 'react';

import LoadingIndicator from './LoadingIndicator';

export default function LoadingOverlay() {
  return (
    <div className="overlay">
      <LoadingIndicator size={100} />
    </div>
  );
}
