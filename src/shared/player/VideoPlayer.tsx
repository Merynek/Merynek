import React, { Component } from 'react';
import { Player } from './Player';
import { Series } from '../../components/Serials/source/serialJson';
import { Row } from 'react-bootstrap';
import './player.scss';

type Props = {
    series: Series;
}
type IState = {
    videoElementRef: React.RefObject<HTMLVideoElement>;
    player: Player;
}

class VideoPlayer extends Component<Props, IState> {
    private myRef = React.createRef<HTMLVideoElement>()

    constructor(props: Props) {
        super(props);

        this.state = {
            videoElementRef: this.myRef,
            player: new Player(this.props.series, this.onChangePart.bind(this))
        }
    }

    componentDidMount() {
        this.state.player.create(this.state.videoElementRef.current as HTMLVideoElement);
    }

    componentWillUnmount() {
        this.state.player.destroy();
    }

    render() {
        return (
        <Row className="video-player">
            <div data-vjs-player>
                <video ref={ this.myRef } className={"video-js"} ></video>
            </div>
            <span>Díly</span>
            {this.renderPartButtons()}
        </Row>
        )
    }

    renderPartButtons() {
        let currentIndex = this.state.player.getIndex();

        return this.props.series.parts.map((part, index) => {
            return (
                <div key={index}>
                    <button className={"part-button " + (currentIndex === index ? "active" : "")} onClick={() => this.handlePartClick(index)}>
                        <span className="part-number">{part.number}.</span>
                        {part.name}
                    </button>
                </div>
            );
        });
    }

    handlePartClick(index: number) {
        this.state.player.setIndexAndPlay(index);
    }

    onChangePart() {
        this.forceUpdate();
    }
}

export default VideoPlayer;
