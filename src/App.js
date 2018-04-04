import React, { Component } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar';
import SearchedPlayers from './Components/SearchedPlayers';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RenderPlayer from './Components/RenderPlayer';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Route exact path="/players/:id" component={RenderPlayer} />
            <Route exact path="/" component={SearchBar}/>
            <SearchedPlayers />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
