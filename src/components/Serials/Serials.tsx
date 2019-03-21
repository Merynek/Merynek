import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

class Serials extends Component<RouteComponentProps> {
    render() {
        const { match } = this.props;

        return (
            <div>
                <Row>
                    <Col>
                        <Link to={`${match.path}/bbt`}>BBT</Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Link to={`${match.path}/himym`}>HIMYM</Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Link to={`${match.path}/simpsons`}>SIMPSONS</Link>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Serials;
