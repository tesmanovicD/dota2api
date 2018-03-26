import React, { Component } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar';


class App extends Component {
  render() {
    return (
        <div className="App">
          <div className="container">
            <SearchBar />
          </div>
        </div>
    );
  }
}

export default App;
