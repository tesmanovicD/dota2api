import React, { Component } from 'react';
import { getPlayerMatches, getHeroesData } from '../util';
import { observer, inject } from 'mobx-react';
import PrintMatch from './PrintMatch';
import { BarLoader } from 'react-spinners';

@inject("account","game")
@observer
export default class PlayerMatches extends Component {

  state = {
      requestStatus: "PENDING",
  }

  componentDidMount() {
    const player = this.props.account.accountInfo;
    const limit = this.props.limit ? this.props.limit : 20;

    getPlayerMatches(player.accountId, limit)
      .then(result => this.props.account.setAccountMatches(result))
      .then(
        getHeroesData()
        .then(result => this.props.game.setHeroesData(result))
      )
      .then(this.setState({requestStatus: "SUCCESS"}))
      .catch(err => {this.setState({requestStatus: "ERROR"})})
  }

  showComponentBasedOnReqStatus = (status) => {
    //eslint-disable-next-line
    switch (status) {
      case 'PENDING':
        return <BarLoader/>
      case 'SUCCESS':
        return (
          <table className="table table-bordered table-striped">
            {this.matches}
          </table>
        )
      case 'ERROR':
        return (
          <h2 className="alert alert-danger">Can't get the user data, try again</h2>
        )
    }
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
        {this.showComponentBasedOnReqStatus(this.state.requestStatus)}
      </div>
    )
  }
}
