import Request from 'superagent';

export function getPlayer(playerName) {
  const API_URL = `https://api.opendota.com/api/search?q=${playerName}`;
  return Request.get(API_URL)
    .then(response => this.props.account.setSearchedAccounts(response.body));
}

export function getPlayerById(playerId) {
  const API_URL = `https://api.opendota.com/api/players/${playerId}`;
  return Request.get(API_URL)
    .then(response => this.props.account.setAccountInfo(response.body))
    .catch(err => {
      if (err.status === 404) alert(err.message)
    })
}

export function getPlayerMatches(playerId) {
  const API_URL = `https://api.opendota.com/api/players/${playerId}/matches`;
  return Request.get(API_URL)
    .then(response => response.body)
    .catch(err => alert(err.message))
}

export function getHeroesData() {
  const API_URL = `https://api.opendota.com/api/heroes`
  return Request.get(API_URL)
    .then(response => response.body)
    .catch(err => alert(err.message))
}

export function getPlayerWinRatio(playerId) {
  const API_URL = `https://api.opendota.com/api/players/${playerId}/wl`;
  return Request.get(API_URL)
    .then(response => response.body)
}

export function getHeroesPlayed(playerId, limit) {
  const API_URL = `https://api.opendota.com/api/players/${playerId}/heroes`;
  return Request.get(API_URL)
    .then(response => response.body)
    .catch(err => alert(err.message))
}

export function secondsToMinutesAndSeconds(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
