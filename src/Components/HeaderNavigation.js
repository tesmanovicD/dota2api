import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import PlayerMatches from './PlayerMatches';
import PlayerOverview from './PlayerOverview';
import { observer, inject } from 'mobx-react';

const HeaderNavigation = inject("account")(observer(({ account }) => (
  <Router>
    <div className="row headernavigation">
      <ul className="list-group navigation">
        <li className="list-group-item">
          <NavLink exact to={`/players/${account.accountInfo.accountId}`} activeClassName="active" pathname="/matches"> Overview </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink exact to={`/players/${account.accountInfo.accountId}/matches`}> Matches </NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path={`/players/:id/matches`} component={PlayerMatches} />
        <Route path={`/players/:id`} component={PlayerOverview} />
      </Switch>
    </div>
  </Router>
)));


export default HeaderNavigation;
