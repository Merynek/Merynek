import React, { Component } from 'react';
import { RouteComponentProps, Switch, Route, Link } from 'react-router-dom';
import Bbt from '../../Serials/BBT/Bbt';
import Himym from '../../Serials/Himym/Himym';
import Simpsons from '../../Serials/Simpsons/Simpsons';

class SerialRouter extends Component<RouteComponentProps> {
    render() {
        const { match } = this.props;
        
        return (
            <div>
                <Switch>
                    <Route path={`${match.path}/bbt`} component={Bbt} />
                    <Route path={`${match.path}/himym`} component={Himym} />
                    <Route path={`${match.path}/simpsons`} component={Simpsons} />
                </Switch>
            </div>
        )
    }
}

export default SerialRouter;
