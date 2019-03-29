import React, { Component } from 'react';
import { Player } from './Player';
import { Series } from '../../components/Serials/source/serialJson';
import { Row } from 'react-bootstrap';
import './player.scss';

type Props = {
    series: Series;
}

class VideoPlayer extends Component<Props> {
    private videoElement: HTMLVideoElement | null;
    private player: Player;

    constructor(props: Props) {
        super(props);
        this.videoElement =  document.createElement('video');
        this.player = new Player(props.series, this.onChangePart.bind(this));
    }

    componentDidMount() {
        this.player.create(this.videoElement as HTMLVideoElement);
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    render() {
        return (
        <Row className="video-player">
            <div data-vjs-player>
                <video ref={ node => this.videoElement = node } className={"video-js"} ></video>
            </div>
            <span>Díly</span>
            {this.renderPartButtons()}
        </Row>
        )
    }

    renderPartButtons() {
        let currentIndex = this.player.getIndex();

        return this.props.series.parts.map((part, index) => {
            return (
                <div key={index}>
                    <button className={"part-button " + (currentIndex === index ? "active" : "")} onClick={() => this.handlePartClick(index)}>{part.name}</button>
                </div>
            );
        });
    }

    handlePartClick(index: number) {
        this.player.setIndexAndPlay(index);
    }

    onChangePart() {
        this.forceUpdate();
    }
}

export default VideoPlayer;
