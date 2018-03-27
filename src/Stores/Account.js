import { observable, action } from 'mobx';


class Account {
  @observable accountInfo = {set: false};
  @observable accountMatches = [];
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
  setAccountMatches(match) {
    this.accountMatches = [];
    match.forEach(x => {
      let isRadiant = match.playerSlot > 127 ? false : true;
      let matchStatus = isRadiant === true ? (x.radiant_win === true ? "Won Match" : "Lost Match") : (x.radiant_win === true ? "Lost Match" : "Won Match");

      this.accountMatches.push({
        "matchId": x.match_id,
        "gameMode": x.game_mode,
        "heroId": x.hero_id,
        "matchStatus": matchStatus,
        "duration": Math.round(x.duration/60),
        "kills": x.kills,
        "deaths": x.deaths,
        "assists": x.assists
      })
    });
  }

}

export default new Account();
