import Request from 'superagent';

// Handle Errors
function handleError(code) {
  if(code === 400) return handleBadRequest();
  if(code === 401) return handleUnauthorized();
  if(code === 403) return handleForbidden();
  if(code === 404) return handleNotFound();
  if(code >= 500) return handleInternal500();
}

function handleBadRequest() {
  return alert("Invalid syntax for this request was provided.");
}

function handleUnauthorized() {
  return alert("You are unauthorized to access the requested resource.");
}

function handleForbidden() {
  return alert("Your account is not authorized to access the requested resource.");
}

function handleNotFound() {
  return alert("We could not find the resource you requested.");
}

function handleInternal500() {
  return alert("Unexpected internal server error, please try again in a few seconds.");
}

//API calls
function getRequestedData(URL) {
  return Request.get(URL)
    .then(response => response.body)
    .catch(err => {
      if(err.response) return handleError(err.response.status)
      return alert(err.message)
    })
}
export function getPlayer(playerName) {
  const API_URL = `https://api.opendota.com/api/search?q=${playerName}`;
  return getRequestedData(API_URL);
}

export function getPlayerById(playerId) {
  const API_URL = `https://api.opendota.com/api/players/${playerId}`;
  return getRequestedData(API_URL);
}

export function getPlayerMatches(playerId) {
  const API_URL = `https://api.opendota.com/api/players/${playerId}/matches`;
  return getRequestedData(API_URL);
}

export function getHeroesData() {
  const API_URL = `https://api.opendota.com/api/heroes`
  return getRequestedData(API_URL)
}

export function getPlayerWinRatio(playerId) {
  const API_URL = `https://api.opendota.com/api/players/${playerId}/wl`;
  return getRequestedData(API_URL);
}

export function getHeroesPlayed(playerId, limit) {
  const API_URL = `https://api.opendota.com/api/players/${playerId}/heroes`;
  return getRequestedData(API_URL)
}

// Other functions
export function secondsToMinutesAndSeconds(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export function sortByAttribute(matchesCopy, attribute, orderBy) {
  if(orderBy === "descending") {
    matchesCopy.sort((a,b) => b[attribute] - a[attribute])
    return matchesCopy;
  } else {
    matchesCopy.sort((a,b) => a[attribute] - b[attribute])
    return matchesCopy;
  }
}

export function checkWordLength(word, maxLength) {
  let newWord = word.length >= maxLength ? (word.substring(0, maxLength)+"...") : word;
  return newWord;
}

export function getUrlQuery(url, query) {
  let params = new URLSearchParams(url)
  return params.get(query);
}
