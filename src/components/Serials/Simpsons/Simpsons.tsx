import React, { Component } from 'react';
import VideoPlayer from '../../../shared/player/VideoPlayer';

class Bbt extends Component {
    private serials: string[] = [];

    render() {
        return (
        <div>   
            <span>Simpsons</span>
            <VideoPlayer serials={this.serials} />
        </div>
        )
    }
}

export default Bbt;
