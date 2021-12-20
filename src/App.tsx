import React, { Component } from 'react';
import {BrowserRouter, withRouter} from 'react-router-dom';
import AppRouter from './routes/router';
import './App.scss';

class App extends Component {
  render() {
      const Routes = withRouter(props => <AppRouter {...props}/>);
    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    );
  }
}

export default App;
