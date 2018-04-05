import React, { Component } from 'react';
import { getPlayer } from '../util';
import { inject } from 'mobx-react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'


@inject("account")
export default class SearchBar extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    getPlayer.bind(this)(e.target.playerName.value);
  }
  render() {
    return (
      <div className="searchbar">
        <form onSubmit={this.handleSubmit} className="heroSearch">
          <div className="form-group text-center">
              <input type="text" name="playerName" placeholder="Insert the name of the player you want to search for..."/>
              <button type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
          </div>
        </form>
      </div>
    )
  }
}
