import React from 'react';
import { inject, observer } from 'mobx-react';

const PlayerInfo = inject("account")(observer(({account}) => (
  <div className="playerInfo row">
  {account.accountInfo.set &&
    <div key={account.accountInfo.accountId}>
      <div className="row">
        <div className="col-md-1">
          <img src={account.accountInfo.avatar} className="img-responsive" alt="user avatar" />
        </div>
        <div className="col-md-4 playerName">
          <h2>{account.accountInfo.playerName}</h2>
        </div>
        <div className="col-md-6 col-md-push-2 rankingDetails">
          <h4>Estimate mmr: {account.accountInfo.mmrEstimate}</h4>
          <h4>Solo rank: {account.accountInfo.soloCompRank}</h4>
          <h4>Rank tier: {account.accountInfo.rankTier}</h4>
        </div>
      </div>
    </div>
  }
  </div>

)));

export default PlayerInfo;
