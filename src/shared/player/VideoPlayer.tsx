import React, { Component } from 'react';
import { Player } from './Player';
import { Series } from '../../components/Serials/source/serialJson';

type Props = {
    series: Series;
}

class VideoPlayer extends Component<Props> {
    private videoElement: HTMLVideoElement | null;
    private player: Player;

    constructor(props: Props) {
        super(props);
        this.videoElement =  document.createElement('video');
        this.player = new Player(props.series);
    }

    componentDidMount() {
        this.player.create(this.videoElement as HTMLVideoElement);
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    render() {
        return (
        <div>   
            <div data-vjs-player>
                <video ref={ node => this.videoElement = node } className="video-js"></video>
            </div>
            <span>Díly</span>
            {this.renderPartButtons()}
        </div>
        )
    }

    renderPartButtons() {
        return this.props.series.parts.map((part, index) => {
            return (
                <div key={index}>
                    <button onClick={() => this.handlePartClick(index)}>{part.name}</button>
                </div>
            );
        });
    }

    handlePartClick(index: number) {
        this.player.setIndexAndPlay(index);
    }
}

export default VideoPlayer;
