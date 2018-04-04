import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import SearchedPlayerList from './SearchedPlayerList';

@inject("account")
@observer
export default class SearchedPlayers extends Component {

  getSearchedPlayers = () => {
    return this.props.account.searchedAccounts.map(account => <SearchedPlayerList account={account} key={account.accountId} />)
  }

  render() {

    return (
      <div className="searchedplayerslist">
        <div className="row">
        { this.getSearchedPlayers() }
        </div>
      </div>
    )
  }
}
