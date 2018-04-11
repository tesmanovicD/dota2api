import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import SearchedPlayerList from './SearchedPlayerList';
import { checkWordLength } from '../util';
import { BrowserRouter as Router } from 'react-router-dom';

@inject("account")
@observer
export default class SearchedPlayers extends Component {

  getSearchedPlayers = () => {
    return this.props.account.searchedAccounts.map(account => {
      let name = checkWordLength(account.name, 10);

      return <div onClick={() => window.location.replace(`players/${account.accountId}`)} className="searchedPlayer" key={account.accountId}>
        <SearchedPlayerList account={account} accountName={name}/>
      </div>
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
