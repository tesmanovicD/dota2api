import React, { Component } from 'react';
import { getHeroesPlayed, getHeroesData } from '../util';
import {observer, inject} from 'mobx-react';
import PrintMostPlayed from './PrintMostPlayed';
import { BarLoader } from 'react-spinners';
import moment from 'moment';

@inject("account","game")
@observer
export default class RecentHeroes extends Component {

  state = {
    requestStatus: "PENDING"
  }

  componentWillMount() {
    const player = this.props.account.accountInfo;

      getHeroesData()
        .then(result => this.props.game.setHeroesData(result))
        .catch(err => console.log(err))
        .then(heroesData => {
          getHeroesPlayed(player.accountId)
            .then(heroesArr => {
              const limit = this.props.limit ? this.props.limit : heroesArr.length;
              this.props.account.setMostPlayedHeroes(heroesArr, this.props.game.heroesData, limit);
            }).then(this.setState({requestStatus: "SUCCESS"}))
        })

  }

  showComponentBasedOnReqStatus = (status) => {
    //eslint-disable-next-line
    switch (status) {
      case 'PENDING':
        return <BarLoader/>
      case 'SUCCESS':
        return (
          <table className="table table-bordered table-striped">
            {this.renderRecentHeroes()}
          </table>
          )
      case 'ERROR':
        return (
          <h2 className="alert alert-danger">Cant get the user data, try again</h2>
        )
    }
  }

  renderRecentHeroes = () => this.props.account.mostPlayedHeroes.map(hero => {
    let lastPlayed = new Date(hero.last_played*1000);
    let lastPlayedFormated = moment(lastPlayed).fromNow();
    let winRatio = ((hero.win/hero.games)*100).toFixed(2);

    return <PrintMostPlayed hero={hero} lastPlayed={lastPlayedFormated} winRatio={winRatio} key={hero.hero_id}/>
   });

  render() {

    return (
      <div className="mostPlayedHeroes">
        {this.showComponentBasedOnReqStatus(this.state.requestStatus)}
      </div>
    )
  }
}