import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

class Serials extends Component<RouteComponentProps> {
    render() {
        const { match } = this.props;

        return (
            <div className="series">
                <span>Seriály</span>
                <Row>
                    <Col>
                        <Link className="serial-button" to={`${match.path}/bbt`}>BBT</Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link className="serial-button" to={`${match.path}/himym`}>HIMYM</Link>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Serials;
