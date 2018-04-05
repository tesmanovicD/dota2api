import React, { Component } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar';
import SearchedPlayers from './Components/SearchedPlayers';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h2 className="text-center site-header">Dota 2 Statistic</h2>
          <div className="container">
            <SearchBar />
            <SearchedPlayers />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
