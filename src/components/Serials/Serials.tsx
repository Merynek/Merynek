import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import SerialRouter from './routes/router';

class Serials extends Component<RouteComponentProps> {
    render() {
        const { match } = this.props;

        return (
            <div>
                <SerialRouter {...this.props} />
                <Link to={`${match.path}/bbt`}>BBT</Link>
                <Link to={`${match.path}/himym`}>HIMYM</Link>
                <Link to={`${match.path}/simpsons`}>SIMPSONS</Link>
            </div>
        )
    }
}

export default Serials;
