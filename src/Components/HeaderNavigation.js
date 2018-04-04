import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import PlayerMatches from './PlayerMatches';
import PlayerPeers from './PlayerPeers';
import PlayerOverview from './PlayerOverview';
import { observer, inject } from 'mobx-react';

const HeaderNavigation = inject("account")(observer(({ account }) => (
  <Router>
    <div className="row headernavigation">
      <ul className="list-group">
        <li className="list-group-item">
          <NavLink exact to={`/players/${account.accountInfo.accountId}`} activeClassName="active"> Overview </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to={`/players/${account.accountInfo.accountId}/matches`}> Matches </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/peers"> Player Peers </NavLink>
        </li>
      </ul>

      <Route exact path={`/players/:id`} component={PlayerOverview} />
      <Route path={`/players/:id/matches`} component={PlayerMatches} />
      <Route path="/peers" component={PlayerPeers} />
    </div>
  </Router>
)));


export default HeaderNavigation;
