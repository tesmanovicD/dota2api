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
    request: {
      status: "PENDING",
      message: ""
    }
  }

  componentWillMount() {
      getHeroesData()
        .then(result => this.props.game.setHeroesData(result))
        .then(heroesData => {
          getHeroesPlayed(this.props.account.accountInfo.accountId || this.props.accountId)
            .then(heroesArr => {
              const limit = this.props.limit ? this.props.limit : heroesArr.length;
              this.props.account.setMostPlayedHeroes(heroesArr, this.props.game.heroesData, limit);
            }).then(() =>{
              if(this.props.account.mostPlayedHeroes.length <= 0) {
                this.setState({request:{status: "ERROR", message: "Player has no heroes played!"}})
              } else {
              this.setState({request:{status: "SUCCESS"}})
              }
            })
        })
        .catch(err => this.setState({request:{status: "ERROR", message: "Can't get user data, please try again"}}))
  }

  showComponentBasedOnReqStatus = (status) => {
    //eslint-disable-next-line
    switch (status) {
      case 'PENDING':
        return <BarLoader/>
      case 'SUCCESS':
        return (
          <table className="table table-bordered">
            <tbody>
              <tr className="table-heading">
                <th>Hero</th>
                <th>Matches</th>
                <th>Win ratio</th>
                <th>Last Played</th>
              </tr>
            {this.renderRecentHeroes()}
            </tbody>
          </table>
          )
      case 'ERROR':
        return (
          <h2 className="alert alert-danger">{this.state.request.message}</h2>
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
        {this.showComponentBasedOnReqStatus(this.state.request.status)}
      </div>
    )
  }
}
