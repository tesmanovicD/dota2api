import React, { Component } from 'react';
import { getHeroesPlayed, getHeroesData } from '../util';
import {observer, inject} from 'mobx-react';


@inject("account","game")
@observer
export default class RecentHeroes extends Component {
  componentWillMount() {
    const player = this.props.account.accountInfo;

      getHeroesData()
        .then(result => this.props.game.setHeroesData(result))
        .catch(err => console.log(err))
        .then(heroesData => {
          getHeroesPlayed(player.accountId)
            .then(result => {
              result.forEach(row => {
                let heroName = this.props.game.heroesData.find(x => parseInt(x.id,10) === parseInt(row.hero_id,10)).name;
                row["hero_name"] = heroName;
                this.props.account.recentHeroes.push(row);
              })
            })
        })


  }
  render() {
    console.log(this.props.account.recentHeroes);
    return (
      <div className="recentHeroes">

      </div>
    )
  }
}
