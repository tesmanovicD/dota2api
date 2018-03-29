import React from 'react';
import { observer, inject } from 'mobx-react';
import PlayerMatches from './PlayerMatches';
import RecentHeroes from './RecentHeroes';

const PlayerOverview = inject("account")(observer(({ account }) => {
    return (
      <div className="PlayerOverview">
        <h2>Latest Matches</h2>
        <PlayerMatches limit="5" />
        <h2>Recent Heroes</h2>
        <RecentHeroes />
      </div>
    )
}));

export default PlayerOverview;
