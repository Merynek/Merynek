import React, { Component } from 'react';
import AppRouter from './routes/router';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">MERYNEK</div>
        <AppRouter />
      </div>
    );
  }
}

export default App;
