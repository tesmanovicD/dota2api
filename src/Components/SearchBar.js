import React, { Component } from 'react';
import { getPlayer } from '../util';

export default class SearchBar extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    getPlayer(e.target.playerName.value);
  }
  render() {

    return (
      <div className="searchbar">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
              <input type="text" name="playerName" placeholder="Insert the name of the player you want to search for..."/>
              <input type="submit" value="Submit"/>
          </div>
        </form>
      </div>
    )
  }
}
