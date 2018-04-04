import React, { Component } from 'react';
import { getPlayer } from '../util';
import { inject } from 'mobx-react';

@inject("account")
export default class SearchBar extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    getPlayer.bind(this)(e.target.playerName.value);
  }
  render() {
    return (
      <div className="searchbar">
        <h2 className="text-center site-header">Dota 2 Statistic</h2>
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
