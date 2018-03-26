import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PlayerMatches from './PlayerMatches';
import PlayerPeers from './PlayerPeers';

const HeaderNavigation = () => (
  <Router>
    <div className="row headernavigation">
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/"> Overview </Link>
        </li>
        <li className="list-group-item">
          <Link to="/matches/:id"> Matches </Link>
        </li>
        <li className="list-group-item">
          <Link to="/peers"> Player Peers </Link>
        </li>
      </ul>

      <Route path="/matches/:id" component={PlayerMatches} />
      <Route path="/peers" component={PlayerPeers} />
    </div>
  </Router>
);


export default HeaderNavigation;
