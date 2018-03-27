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
      this.accountMatches.push({
        "matchId": x.match_id,
        "gameMode": x.game_mode,
        "heroId": x.hero_id,
        "playerSlot": x.player_slot,
        "matchWon": x.radiant_win,
        "duration": x.duration,
        "kills": x.kills,
        "deaths": x.deaths,
        "assists": x.assists
      })
    });
  }

}

export default new Account();
