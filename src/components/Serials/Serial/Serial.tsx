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
    isSerial: boolean;
}

class Serial extends Component<ISerial> {
    render() {
        let serie = this.props.series.find((serie: Series) => {
            return serie.number === this.props.number;
        }) || this.props.series[0];

        return (
        <div className="serial-page">
            <Row>   
                <Col className="serial-name">
                    <span>{this.props.name}</span>
                </Col>
            </Row>
            {this.props.isSerial && (
                <Row>
            </Row>
            )}
            <Row>   
                <Col>
                    <VideoPlayer series={this.props.series} seriesNumber={this.props.number} />
                </Col>
            </Row>
            <div className="divider"></div>
            {this.props.isSerial && (
                <Row className="series">
                    <span>Série</span>
                    { this.renderSerieButtons() }
                    <div className="divider"></div>
                </Row>
            )}
            <Link className="back-to-serials-button" to="/serials"> Zpět na serialy</Link>
        </div>
        )
    }

    renderSerieButtons() {
        return this.props.series.map((serie, key) => {
            return (
                <Link onClick={this.handleClickSerie} key={key} className="serial-button" to={`/serials/${this.props.routeName}/${serie.number}`}>{serie.number}. Série</Link>
            );
        });
    }

    handleClickSerie() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
}

export default Serial;
