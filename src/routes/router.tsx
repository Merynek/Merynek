import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, RouteComponentProps } from 'react-router-dom';
import Home from '../components/Home/Home';
import Serials from '../components/Serials/Serials';
import Serial from '../components/Serials/Serial/Serial';
import bbtJson from '../components/Serials/source/bbt.json';
import marvelJson from '../components/Serials/source/marvel.json';
import himymJson from '../components/Serials/source/himym.json';
import { Series } from '../components/Serials/source/serialJson';

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
                    <Route path="/serials/marvel" component={this.MarvelSwitch} />
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

    private MarvelSwitch() {
        return (
          <Switch>
            <Route exact path='/serials/marvel' component={MarvelComponent}/>
            <Route path='/serials/marvel/:number' component={MarvelComponent}/>
          </Switch>
        );
    }
}

export default AppRouter;

function BbtComponent(route: RouteComponentProps) {
    const number = Number(Object.create(route.match.params).number) || 1;
    const json: Series[] = bbtJson;

    return (
        <Serial isSerrial={true} key={number} number={number} series={json} name="Teorie velkého třesku" routeName="bbt"></Serial>
    );
}

function HimymComponent(route: RouteComponentProps) {
    const number = Number(Object.create(route.match.params).number) || 1;
    const json: Series[] = himymJson;

    return (
        <Serial isSerrial={true} key={number} number={number} series={json} name="Jak jsem poznal vaši matku" routeName="himym"></Serial>
    );
}

function MarvelComponent(route: RouteComponentProps) {
    const number = Number(Object.create(route.match.params).number) || 1;
    const json: Series[] = marvelJson;

    return (
        <Serial isSerrial={false} key={number} number={number} series={json} name="Marvel" routeName="marvel"></Serial>
    );
}
