import React, { Component } from 'react';
import { getPlayer } from '../util';
import { inject } from 'mobx-react';

@inject("account")
export default class SearchBar extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    getPlayer(e.target.playerName.value)
    .then(player => this.props.account.setAccountInfo(player));
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
