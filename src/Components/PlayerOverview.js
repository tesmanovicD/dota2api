import React from 'react';
import PlayerMatches from './PlayerMatches';
import MostPlayedHeroes from './MostPlayedHeroes';

const PlayerOverview = (props) => (
  <div className="playerOverview">
    <h2>Latest Matches</h2>
    <PlayerMatches limit="5" accountId={props.match.params.id} />
    <h2>Most Played Heroes</h2>
    <MostPlayedHeroes limit="5" accountId={props.match.params.id} />
  </div>

);

export default PlayerOverview;
