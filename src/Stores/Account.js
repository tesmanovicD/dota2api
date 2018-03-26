import { observable, action } from 'mobx';


class Account {
  @observable accountInfo = {set: false};
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
}

export default new Account();
