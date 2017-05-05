import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Pluralsight Admin</h1>
        <p>React, Redux and ...</p>
        <Link to="about" className="btn btn-primary btn-lg">Learm more</Link>
      </div>
    );
  }
}

export default HomePage;
