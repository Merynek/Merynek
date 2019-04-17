import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';

class Home extends Component {
    render() {
        return (
        <Container>   
            <Row>
                <Col>
                    <Link className="back-to-serials-button" to="/serials">Seriály</Link>
                </Col>
            </Row>
        </Container>
        )
    }
}

export default Home;
