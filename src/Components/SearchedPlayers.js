import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import SearchedPlayerList from './SearchedPlayerList';
import RenderPlayer from './RenderPlayer';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';

@inject("account")
@observer
export default class SearchedPlayers extends Component {

  renderRedirect = (accountId) => {
    return <Redirect to={`/players/${accountId}`} />
  }

  getSearchedPlayers = () => {
    return this.props.account.searchedAccounts.map(account =>
      <Link
        to={`/players/${account.accountId}`}
        onClick={this.renderRedirect(account.accountId)}
        key={account.accountId}>

      <SearchedPlayerList account={account}/>
    </Link>)
  }

  render() {

    return (
      <Router>
      <div className="searchedplayerslist">
        <div className="row">
        { this.getSearchedPlayers() }
        </div>
        <Route path="/players/:id" component={ RenderPlayer } />
      </div>
    </Router>
    )
  }
}
