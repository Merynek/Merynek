import React, { Component } from 'react';
import { Player } from './Player';

type Props = {
    serials: string[];
}

class VideoPlayer extends Component<Props> {
    private videoElement: HTMLVideoElement | null;
    private player: Player;

    constructor(props: Props) {
        super(props);
        this.videoElement =  document.createElement('video');
        this.player = new Player(props.serials);
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
        </div>
        )
    }
}

export default VideoPlayer;
