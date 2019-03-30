import React, { Component } from 'react';
import VideoPlayer from '../../../shared/player/VideoPlayer';
import { Series } from '../source/serialJson';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import './serial.scss';

interface ISerial {
    number: number;
    name: string;
    routeName: string;
    series: Series[];
}

class Serial extends Component<ISerial> {
    render() {
        let serie = this.props.series.find((serie: Series) => {
            return serie.number === this.props.number;
        }) || this.props.series[0];

        return (
        <div className="serial-page">
            <Row>   
                <Col>
                    <span className="serial-name">{this.props.name}</span>
                    <VideoPlayer series={serie} />
                </Col>
            </Row>
            <div className="divider"></div>
            <Row className="series">
                <span>Série</span>
                { this.renderSerieButtons() }
                <div className="divider"></div>
                <Link className="back-to-serials-button" to="/serials"> Zpět na serialy</Link>
            </Row>
        </div>
        )
    }

    renderSerieButtons() {
        return this.props.series.map((serie, key) => {
            return (
                <Link key={key} className="serial-button" to={`/serials/${this.props.routeName}/${serie.number}`}>{serie.number}. Série</Link>
            );
        });
    }
}

export default Serial;
