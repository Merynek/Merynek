import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, RouteComponentProps } from 'react-router-dom';
import Home from '../components/Home/Home';
import Serials from '../components/Serials/Serials';
import Serial from '../components/Serials/Serial/Serial';
import jsonSource from '../components/Serials/source/serials.json';
import { serialsJson, Series } from '../components/Serials/source/serialJson';

class AppRouter extends Component {
    render() {
        return (
        <div>   
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/serials" component={Serials} />
                    <Route path="/serials/bbt" component={this.BbtSwitch} />
                    <Route path="/serials/himym" component={this.HimymSwitch} />
                    <Route path="/serials/simpsons" component={this.SimpsonsSwitch} />
                </Switch>
            </BrowserRouter>
        </div>
        )
    }

    private BbtSwitch() {
        return (
          <Switch>
            <Route exact path='/serials/bbt' component={BbtComponent}/>
            <Route path='/serials/bbt/:number' component={BbtComponent}/>
          </Switch>
        );
    }

    private HimymSwitch() {
        return (
          <Switch>
            <Route exact path='/serials/himym' component={HimymComponent}/>
            <Route path='/serials/himym/:number' component={HimymComponent}/>
          </Switch>
        );
    }

    private SimpsonsSwitch() {
        return (
          <Switch>
            <Route exact path='/serials/simpsons' component={SimpsonsComponent}/>
            <Route path='/serials/simpsons/:number' component={SimpsonsComponent}/>
          </Switch>
        );
    }
}

export default AppRouter;

function BbtComponent(route: RouteComponentProps) {
    const number = Number(Object.create(route.match.params).number) || 1;
    const json: serialsJson = jsonSource;

    return (
        <Serial key={number} number={number} series={json.bbt} name="BBT" routeName="bbt"></Serial>
    );
}

function HimymComponent(route: RouteComponentProps) {
    const number = Number(Object.create(route.match.params).number) || 1;
    const json: serialsJson = jsonSource;

    return (
        <Serial key={number} number={number} series={json.himym} name="HIMYM" routeName="himym"></Serial>
    );
}

function SimpsonsComponent(route: RouteComponentProps) {
    const number = Number(Object.create(route.match.params).number) || 1;
    const json: serialsJson = jsonSource;

    return (
        <Serial key={number} number={number} series={json.simpsons} name="SIMPSONS" routeName="simpsons"></Serial>
    );
}
