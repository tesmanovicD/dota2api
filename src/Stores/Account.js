import { observable, action } from 'mobx';


class Account {
  @observable accountInfo = {set: false};
  @observable accountMatches = [];
  @observable mostPlayedHeroes = [];
  @observable indexOfLastTodo;
  @observable indexOfFirstTodo;
  @observable pageNumbers = [];
  @observable currentPage;
  @action
  setAccountInfo(result) {
    this.accountInfo =
      {
        "soloCompRank": result.solo_competitive_rank,
        "rankTier": result.rank_tier,
        "mmrEstimate": result.mmr_estimate.estimate,
        "accountId": result.profile.account_id,
        "avatar": result.profile.avatar,
        "playerName": result.profile.personaname,
        "profileUrl": result.profile.profileurl,
        "set": true
      }
  }
  setAccountMatches(match, game, limit) {
    if(!limit) limit = match.length
    this.accountMatches = [];

    for(let i=0; i<limit; i++) {
      let gameMode = game.gameModes.find(a=>a.id === match[i].game_mode).name; //gettering the name of the current gameMode
      let heroName = game.heroesData.find(a=>a.id === match[i].hero_id).name; //gettering the name of the current hero_id
      let isRadiant = match[i].playerSlot > 127 ? false : true;
      let matchStatus = isRadiant === true ? (match[i].radiant_win === true ? "Won Match" : "Lost Match") : (match[i].radiant_win === true ? "Lost Match" : "Won Match");

      this.accountMatches.push({
        "matchId": match[i].match_id,
        "gameModeId": match[i].game_mode,
        "heroId": match[i].hero_id,
        "heroName": heroName,
        "matchStatus": matchStatus,
        "duration": Math.round(match[i].duration/60),
        "gameMode": gameMode,
        "kills": match[i].kills,
        "deaths": match[i].deaths,
        "assists": match[i].assists
      })
    };
    }

  setMostPlayedHeroes(heroes, heroesData, limit) {
    this.mostPlayedHeroes = [];

    //sorting array by most played
    heroes.sort(function(a, b) {
      return b["games"] - a["games"];
    })

    for(let i=0; i<limit; i++) {
      let heroName = heroesData.find(x => x.id === parseInt(heroes[i].hero_id, 10)).name; //gettering the name of the current hero_id
      heroes[i]["hero_name"] = heroName;
      if(heroes[i]["games"]>0) this.mostPlayedHeroes.push(heroes[i]);//if the user played at least once current hero -> store it
    }
  }

}

export default new Account();
