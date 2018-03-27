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
      let gameModes = this.props.game.gameModes.filter(x=>x.id === match.gameMode);
      let heroesName = this.props.game.heroesData.filter(x=>x.id === match.heroId)
      let isRadiant = match.playerSlot > 127 ? false : true;
      let matchStatus = isRadiant === true ? (match.matchWon === true ? "Won Match" : "Lost Match") : (match.matchWon === true ? "Lost Match" : "Won Match");

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
          <td>{heroesName[0].name}</td>
          <td>{matchStatus}</td>
          <td>{gameModes[0].name}</td>
          <td>{Math.round(match.duration /60)} min</td>
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
