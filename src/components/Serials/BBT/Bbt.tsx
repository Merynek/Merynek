import React, { Component } from 'react';
import VideoPlayer from '../../../shared/player/VideoPlayer';

class Bbt extends Component {
    private serials: string[] = [
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        "http://techslides.com/demos/sample-videos/small.mp4",
        "http://vjs.zencdn.net/v/oceans.mp4"
    ]

    render() {
        console.log("BBT");
        return (
        <div>   
            <span>BBT</span>
            <VideoPlayer serials={this.serials} />
        </div>
        )
    }
}

export default Bbt;
