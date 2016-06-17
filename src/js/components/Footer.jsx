import React from 'react';

import pkg from '../../../package.json';

export default function Footer() {
  return (
    <footer>
      <a target="_blank" href="https://www.github.com/joeattardi/github-pr-dashboard">
        GitHub Pull Request Dashboard v{pkg.version}
      </a>
    </footer>
  );
}
