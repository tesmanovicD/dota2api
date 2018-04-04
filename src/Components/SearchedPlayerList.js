import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PlayerOverview from './PlayerOverview';

const SearchedPlayerList = (props) => (
  <Router>
  <Link to={`/players/${props.account.accountId}`}>
    <div className="col-md-4 row playerBox">
      <div className="col-md-4">
        <img src={props.account.avatar} className="img-responsive" alt={"user "+props.account.accountId+" avatar"} />
      </div>

      <div className="col-md-7">
        <h3>{props.account.name}</h3>
        <p>Last Match: {props.account.lastMatch}</p>
      </div>

        <Route path="/players/:id" component={ PlayerOverview } />
    </div>
  </Link>
  </Router>
);

export default SearchedPlayerList;
