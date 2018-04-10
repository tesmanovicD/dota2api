import { observable, action } from 'mobx';
import moment from 'moment';

class Account {
  @observable accountInfo = {set: false};
  @observable accountMatches = [];
  @observable mostPlayedHeroes = [];
  @observable indexOfLastTodo;
  @observable indexOfFirstTodo;
  @observable pageNumbers = [];
  @observable currentPage;
  @observable searchedAccounts = [];
  @action
  setSearchedAccounts(accounts) {
    this.searchedAccounts = [];
    accounts.forEach(account => {
      this.searchedAccounts.push({
        "accountId": account.account_id,
        "avatar": account.avatarfull,
        "name": account.personaname,
        "lastMatch": account.last_match_time === null ? "never" : moment(account.last_match_time).fromNow()
      })
    })
  }
  setAccountInfo(result, winLoses) {
    this.accountInfo =
      {
        "soloCompRank": result.solo_competitive_rank === null ? "none" : result.solo_competitive_rank,
        "rankTier": result.rank_tier === null ? "none" : result.rank_tier,
        "mmrEstimate": result.mmr_estimate.estimate === undefined ? "none" : result.mmr_estimate.estimate,
        "accountId": result.profile.account_id,
        "avatar": result.profile.avatar,
        "playerName": result.profile.personaname,
        "profileUrl": result.profile.profileurl,
        "winRatio": (winLoses.win/(winLoses.lose + winLoses.win)*100).toFixed(2),
        "set": true
      }
  }
  setAccountMatches(match, game, limit) {
    if(!limit) limit = match.length
    this.accountMatches = [];
    for(let i=0; i<limit; i++) {
      let gameMode = game.gameModes.find(g=>g.id === match[i].game_mode).name; //gettering the name of the current gameMode
      let heroName = game.heroesDetails.find(h=>h.id === match[i].hero_id).localized_name//gettering the name of the current hero_id
      let isRadiant = match[i].playerSlot > 127 ? false : true;
      let matchStatus = isRadiant === true ? (match[i].radiant_win === true ? 1 : 0) : (match[i].radiant_win === true ? 0 : 1);

      this.accountMatches.push({
        "matchId": match[i].match_id,
        "gameModeId": match[i].game_mode,
        "heroId": match[i].hero_id,
        "heroName": heroName,
        "matchWon": matchStatus,
        "matchStatus": matchStatus === 1 ? "Won" : "Lost",
        "duration": match[i].duration,
        "gameMode": gameMode,
        "kills": match[i].kills,
        "deaths": match[i].deaths,
        "assists": match[i].assists,
      })
    };
    }

  sortArray(match) {
    this.accountMatches = [];
    match.forEach(match => {
      this.accountMatches.push(match);
    })
  }

  setMostPlayedHeroes(heroes, heroesData, limit) {
    this.mostPlayedHeroes = [];
    //sorting array by most played
    heroes.sort(function(a, b) {
      return b["games"] - a["games"];
    })

    for(let i=0; i<limit; i++) {
      let heroName = heroesData.find(x => x.id === parseInt(heroes[i].hero_id, 10)); //gettering the name of the current hero_id
      heroes[i]["hero_name"] = heroName.name;
      if(heroes[i]["games"]>0) this.mostPlayedHeroes.push(heroes[i]);//if the user played at least once current hero -> store it
    }
  }

}

export default new Account();
