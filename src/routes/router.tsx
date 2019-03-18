import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import Serials from '../components/Serials/Serials';

class AppRouter extends Component {
    render() {
        return (
        <div>   
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/serials" component={Serials} />
                </Switch>
            </BrowserRouter>
        </div>
        )
    }
}

export default AppRouter;
