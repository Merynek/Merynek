import React, { Component } from 'react';
import {Link, useLocation, useMatch} from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const Serials = () => {
    const {pathname} = useLocation();
    return (
        <div className="series">
            <span>Seriály</span>
            <Row>
                <Col>
                    <Link className="serial-button" to={`${pathname}/bbt`}>TBBT</Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link className="serial-button" to={`${pathname}/himym`}>HIMYM</Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link className="serial-button" to={`${pathname}/marvel`}>MARVEL</Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link className="serial-button" to={`${pathname}/x-men`}>X-MEN</Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link className="serial-button" to={`${pathname}/dc`}>DC EXTENDED UNIVERSE</Link>
                </Col>
            </Row>
        </div>
    )
}

export default Serials;
