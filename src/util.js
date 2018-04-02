export function getPlayer(playerName) {
  const API_URL = `https://api.opendota.com/api/players/${playerName}`;
  return fetch(API_URL)
    .then(resolve => resolve.json())
    .then(result => result);
}

export function getPlayerMatches(playerId) {
  const API_URL = `https://api.opendota.com/api/players/${playerId}/matches`;
  return fetch(API_URL)
    .then(resolve => resolve.json())
    .then(result => result)
    .catch(err => alert("No recent matches for current user"))
}

export function getHeroesData() {
  const API_URL = `https://api.opendota.com/api/heroes`
  return fetch(API_URL)
    .then(resolve => resolve.json())
    .then(heroData => heroData)
    .catch(err => alert("Can't get heroes data from API"))
}

export function getPlayerWinRatio(playerId) {
  const API_URL = `https://api.opendota.com/api/players/${playerId}/wl`;
  return fetch(API_URL)
    .then(resolve => resolve.json())
    .then(result => resolve.json());
}

export function getHeroesPlayed(playerId, limit) {
  const API_URL = `https://api.opendota.com/api/players/${playerId}/heroes`;
  return fetch(API_URL)
    .then(resolve => resolve.json())
    .then(heroesPlayed => heroesPlayed)
    .catch(err => alert("No recent heroes"))
}

export function secondsToMinutesAndSeconds(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
