import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './routes/router';
import './App.scss';

class App extends Component {
    render() {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
  }
}

export default App;
