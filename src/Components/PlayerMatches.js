import React, { Component } from 'react';
import { getPlayerMatches, getHeroesData } from '../util';
import { observer, inject } from 'mobx-react';

@inject("account","game")
@observer
export default class PlayerMatches extends Component {

  componentWillMount() {
    const player = this.props.account.accountInfo;

    getPlayerMatches(player.accountId, 20)
      .then(result => this.props.account.setAccountMatches(result))
      .then(getHeroesData()
        .then(result => this.props.game.setHeroesData(result))
      )
      .catch(err => console.log("err: ",err))
  }

  render() {
    const matches = this.props.account.accountMatches.map(match => {
      let gameModes = this.props.game.gameModes.find(x=>x.id === match.gameMode).name;
      let heroesName = this.props.game.heroesData.find(x=>x.id === match.heroId).name;


      return (
        <tbody key={match.matchId}>
        <tr>
          <th>Hero</th>
          <th>Result</th>
          <th>Type</th>
          <th>Duration</th>
          <th>K/D/A</th>
        </tr>
        <tr>
          <td>{heroesName}</td>
          <td>{match.matchStatus}</td>
          <td>{gameModes}</td>
          <td>{match.duration} min</td>
          <td>
            {match.kills}/{match.deaths}/{match.assists}
          </td>
        </tr>
      </tbody>
      )
    })
    return (
      <div className="playermatches">
        <h2>Latest Matches</h2>
        <table className="table table-bordered table-striped">
          {matches}
        </table>
      </div>
    )
  }
}
