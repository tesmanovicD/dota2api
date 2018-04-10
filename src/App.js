import React, { Component } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar';
import SearchedPlayers from './Components/SearchedPlayers';
import NoMatch from './Components/NoMatch';
import RenderPlayer from './Components/RenderPlayer';
import SiteFooter from './Components/SiteFooter';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <h1 className="text-center site-header" onClick={() => window.location.replace("/")} title="Dota 2 Homepage">
            Dota 2 Statistics
            </h1>
            <Switch>
              <Route exact path ="/" component={SearchBar} />
              <Route exact path="/players/:id" component={ RenderPlayer } />
              <Route exact path="/players/:id/matches" component={ RenderPlayer } />
              <Route component={NoMatch} />
            </Switch>

            <SearchedPlayers />
            <SiteFooter />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
