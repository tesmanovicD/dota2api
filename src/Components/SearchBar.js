import React, { Component } from 'react';
import { getPlayer } from '../util';
import { inject } from 'mobx-react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import mainLogo from '../assets/dota2bg.jpg';
import { BarLoader } from 'react-spinners';

@inject("account")
export default class SearchBar extends Component {

  state = {
    loading: false
  }

  handleSubmit = (e) => {
    this.setState({loading: true})
    e.preventDefault();
    getPlayer(e.target.playerName.value)
    .then(player => {
      if(player && player.length > 0) { 
        this.props.account.setSearchedAccounts(player)
      } else {
        alert("User not found!");
      }
      this.setState({loading: false})
    })
    .catch(err => alert(err))


  }
  render() {
    return (
      <div className="searchbar">
        <form onSubmit={this.handleSubmit} className="heroSearch">
          <div className="form-group text-center">
              <input type="text" name="playerName" placeholder="Insert the name of the player you want to search for..." required/>
              <button type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
          </div>
        </form>
        {this.props.account.searchedAccounts.length < 1 &&
          <img src={mainLogo} alt="site logo" className="img-responsive logo-image" />
        }
        {this.state.loading &&
          <div className="col-md-offset-3 barLoader">
            <BarLoader width={500} height={10}/>
          </div>
        }
      </div>
    )
  }
}
