import React, { Component } from 'react';
import { getHeroesPlayed, getHeroesData } from '../util';
import {observer, inject} from 'mobx-react';
import PrintRecentHeroes from './PrintRecentHeroes';
import { BarLoader } from 'react-spinners';

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
            .then(result => {
              result.forEach(row => {
                let heroName = this.props.game.heroesData.find(x => x.id === parseInt(row.hero_id, 10)).name;
                row["hero_name"] = heroName;
                this.props.account.recentHeroes.push(row);
              })
            })
        })
        .then(this.setState({requestStatus: "SUCCESS"}))
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
          <h2 className="alert alert-danger">Can't get the user data, try again</h2>
        )
    }
  }

  renderRecentHeroes = () => this.props.account.recentHeroes.map(hero => {
    let lastPlayed = new Date(hero.last_played*1000);
    let lastPlayedFormated = lastPlayed.toISOString().substring(0, 10);
    let winRatio = ((hero.win/hero.games)*100).toFixed(2);

    return <PrintRecentHeroes hero={hero} lastPlayed={lastPlayedFormated} winRatio={winRatio} key={hero.hero_id}/>
   });

  render() {

    return (
      <div className="recentHeroes">
        {this.showComponentBasedOnReqStatus(this.state.requestStatus)}
      </div>
    )
  }
}
