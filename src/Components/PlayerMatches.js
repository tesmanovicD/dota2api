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

  componentWillMount() {
    const player = this.props.account.accountInfo;
    const limit = this.props.limit ? this.props.limit : 20;

    getHeroesData()
    .then(result => this.props.game.setHeroesData(result))
    .then(heroesData =>
      getPlayerMatches(player.accountId, limit)
        .then(result => {
          this.props.account.setAccountMatches(result,this.props.game)
        }).then(this.setState({requestStatus: "SUCCESS"}))
    )
      .catch(err => {console.log(err);this.setState({requestStatus: "ERROR"})})
  }

  showComponentBasedOnReqStatus = (status) => {
    //eslint-disable-next-line
    switch (status) {
      case 'PENDING':
        return <BarLoader />
      case 'SUCCESS':
        return (
          <table className="table table-bordered table-striped">
            {this.renderPlayerMatches()}
          </table>
        )
      case 'ERROR':
        return (
          <h2 className="alert alert-danger">Can't get the user data, try again</h2>
        )
    }
  }

  renderPlayerMatches = () => this.props.account.accountMatches.map(match => {
    return <PrintMatch match={match} key={match.matchId} />
  })

  render() {

      return (
      <div className="playermatches">
        {this.showComponentBasedOnReqStatus(this.state.requestStatus)}
      </div>
    )
  }
}
