export function getPlayer(playerName) {
  const API_URL = `https://api.opendota.com/api/players/${playerName}`;
  return fetch(API_URL)
    .then(resolve => resolve.json())
    .then(result => result);
}
