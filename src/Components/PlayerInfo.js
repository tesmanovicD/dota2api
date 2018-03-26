import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import HeaderNavigation from './HeaderNavigation';
import PlayerOverview from './PlayerOverview';

@inject("account")
@observer
export default class PlayerInfo extends Component {
  render() {
    const player = this.props.account.accountInfo;

    return (
      <div className="playerInfo">
      {player.set &&
        <div key={player.accountId}>
          <PlayerOverview />
          <HeaderNavigation />
        </div>
      }
      </div>
    )
  }
}
