import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import SearchedPlayerList from './SearchedPlayerList';
import { checkWordLength } from '../util';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';

@inject("account")
@observer
export default class SearchedPlayers extends Component {

  renderRedirect = (accountId) => {
    return <Redirect to={`/players/${accountId}`} />
  }

  getSearchedPlayers = () => {
    return this.props.account.searchedAccounts.map(account => {
      let name = checkWordLength(account.name, 10);
      return <Link
        to={`/players/${account.accountId}`}
        onClick={this.renderRedirect(account.accountId)}
        key={account.accountId}>

      <SearchedPlayerList account={account} accountName={name}/>
    </Link>
    })
  }

  render() {

    return (
      <Router>
      <div className="searchedplayerslist">
        <div className="row">
        { this.getSearchedPlayers() }
        </div>

      </div>
    </Router>
    )
  }
}
