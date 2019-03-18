import React, { Component } from 'react';
import AppRouter from './routes/router';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>HEADER</div>
        <AppRouter />
        <div>FOOTER</div>
      </div>
    );
  }
}

export default App;
