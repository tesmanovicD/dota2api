import { observable, action } from 'mobx';


class Account {
  @observable accountInfo = {set: false};
  @observable accountMatches = [];
  @observable mostPlayedHeroes = [];
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
  setAccountMatches(match, game) {
    this.accountMatches = [];
    match.forEach(x => {
      let gameMode = game.gameModes.find(a=>a.id === x.game_mode).name; //gettering the name of the current gameMode
      let heroName = game.heroesData.find(a=>a.id === x.hero_id).name; //gettering the name of the current hero_id
      let isRadiant = match.playerSlot > 127 ? false : true;
      let matchStatus = isRadiant === true ? (x.radiant_win === true ? "Won Match" : "Lost Match") : (x.radiant_win === true ? "Lost Match" : "Won Match");

      this.accountMatches.push({
        "matchId": x.match_id,
        "gameModeId": x.game_mode,
        "heroId": x.hero_id,
        "heroName": heroName,
        "matchStatus": matchStatus,
        "duration": Math.round(x.duration/60),
        "gameMode": gameMode,
        "kills": x.kills,
        "deaths": x.deaths,
        "assists": x.assists
      })
    });
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
