import React from 'react';
import { observer, inject } from 'mobx-react';
import PlayerMatches from './PlayerMatches';

const PlayerOverview = inject("account")(observer(({ account }) => {
    return (
      <div className="PlayerOverview">
        <h2>Latest Matches</h2>
        <PlayerMatches limit="5" />
      </div>
    )
}));

export default PlayerOverview;
