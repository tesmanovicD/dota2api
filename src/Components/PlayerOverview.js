import React from 'react';
import { observer, inject } from 'mobx-react';

const PlayerOverview = inject("account")(observer(({ account }) => {
    const player = account.accountInfo;
    return (
      <div className="PlayerOverview">
        <h2>PlayerInfo</h2><hr />
        <div className="row">
          <div className="col-md-1">
            <img src={player.avatar} className="img-responsive" alt="user avatar" />
          </div>
          <div className="col-md-3 playerName">
            <h2>{player.playerName}</h2>
          </div>
          <div className="col-md-5 col-md-push-3 rankingDetails">
            <h4>Estimate mmr: {player.mmrEstimate}</h4>
            <h4>Solo rank: {player.soloCompRank}</h4>
            <h4>Rank tier: {player.rankTier}</h4>
          </div>
        </div>
      </div>
    )
}));

export default PlayerOverview;
