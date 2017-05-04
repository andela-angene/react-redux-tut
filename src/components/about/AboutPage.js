import React from 'react';
import { Link } from 'react-router';

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <p>This application uses React, Reduxx ....</p>
        <Link to="/">Home</Link>
      </div>
    )
  }
}

export default AboutPage;
