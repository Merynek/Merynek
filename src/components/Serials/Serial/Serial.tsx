import React, { Component } from 'react';
import VideoPlayer from '../../../shared/player/VideoPlayer';
import { Series } from '../source/serialJson';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

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
        <div>
            <Row>   
                <Col>
                    <span>{this.props.name}</span>
                    <VideoPlayer series={serie} />
                </Col>
            </Row>
            <Row>
                <Col>
                    { this.renderSerieButtons() }
                    <Link to="/serials"> Zpět na serialy</Link>
                </Col>
            </Row>
        </div>
        )
    }

    renderSerieButtons() {
        return this.props.series.map((serie, key) => {
            return (
                <div key={key}>
                    <Link to={`/serials/${this.props.routeName}/${serie.number}`}>{serie.number}. Série</Link>
                </div>
            );
        });
    }
}

export default Serial;
