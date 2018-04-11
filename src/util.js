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

export function getPlayer(playerName) {
  const API_URL = `https://api.opendota.com/api/search?q=${playerName}`;
  return Request.get(API_URL)
    .then(response => {
      if(response.body.length < 1) { throw new Error("Username not found") }
      return response.body
    })
    .catch(err => {
      if(err.response) return handleError(err.response.status)
      return alert(err.message)
    })
}

export function getPlayerById(playerId) {
  const API_URL = `https://api.opendota.com/api/players/${playerId}`;
  return Request.get(API_URL)
    .then(response => {
      if(!response.body.profile) { return alert("Invalid profile ID") }
      return response.body
    })
    .catch(err => {
      if(err.response) return handleError(err.response.status)
      return err.message
    })
}

export function getPlayerMatches(playerId) {
  const API_URL = `https://api.opendota.com/api/players/${playerId}/matches`;
  return Request.get(API_URL)
    .then(response => response.body)
    .catch(err => {
      if(err.response) return handleError(err.response.status)
      return alert(err.message)
    })
}

export function getHeroesData() {
  const API_URL = `https://api.opendota.com/api/heroes`
  return Request.get(API_URL)
    .then(response => response.body)
    .catch(err => {
      if(err.response) return handleError(err.response.status)
      return alert(err.message)
    })
}

export function getPlayerWinRatio(playerId) {
  const API_URL = `https://api.opendota.com/api/players/${playerId}/wl`;
  return Request.get(API_URL)
    .then(response => response.body)
    .catch(err => {
      if(err.response) return handleError(err.response.status)
      return alert(err.message)
    })
}

export function getHeroesPlayed(playerId, limit) {
  const API_URL = `https://api.opendota.com/api/players/${playerId}/heroes`;
  return Request.get(API_URL)
    .then(response => response.body)
    .catch(err => {
      if(err.response) return handleError(err.response.status)
      return alert(err.message)
    })
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

export function setPageNavigation() {
  this.props.account.indexOfLastTodo = this.props.account.currentPage * 20;
  this.props.account.indexOfFirstTodo = this.props.account.indexOfLastTodo - 20;
}

export function getPageNumbers() {
  this.props.account.pageNumbers = [];
  for (let i = 1; i <= Math.ceil(this.props.account.accountMatches.length / 20); i++) {
    this.props.account.pageNumbers.push(i);
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
