import React, { Component } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar';
import PlayerInfo from './Components/PlayerInfo';

class App extends Component {
  render() {
    return (
        <div className="App">
          <div className="container">
            <SearchBar />
            <PlayerInfo />
          </div>
        </div>
    );
  }
}

export default App;
