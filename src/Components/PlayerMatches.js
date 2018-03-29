import React, { Component } from 'react';
import { getPlayerMatches, getHeroesData } from '../util';
import { observer, inject } from 'mobx-react';
import PrintMatch from './PrintMatch';

@inject("account","game")
@observer
export default class PlayerMatches extends Component {

  componentWillMount() {
    const player = this.props.account.accountInfo;
    const limit = this.props.limit ? this.props.limit : 20;

    getPlayerMatches(player.accountId, limit)
      .then(result => this.props.account.setAccountMatches(result))
      .then(
        getHeroesData()
        .then(result => this.props.game.setHeroesData(result))
      )
      .catch(err => console.log("err: ",err))

  }

  render() {
      this.matches = this.props.account.accountMatches.map(match => {
      let gameModes = this.props.game.gameModes.find(x=>x.id === match.gameMode).name;
      let heroesName = this.props.game.heroesData.find(x=>x.id === match.heroId).name;

      return (
        <PrintMatch match={match} gameModes={gameModes} heroesName={heroesName} key={match.matchId} />
      )
      })

      return (
      <div className="playermatches">
        <table className="table table-bordered table-striped">
          {this.matches}
        </table>
      </div>
    )
  }
}
