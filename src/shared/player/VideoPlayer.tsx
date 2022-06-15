import React, { Component } from 'react';
import {IPlayInfo, Player} from './Player';
import { Series } from '../../components/Serials/source/serialJson';
import { Row } from 'react-bootstrap';
import './player.scss';

type Props = {
    series: Series[];
    seriesNumber: number;
}
type IState = {
    videoElementRef: React.RefObject<HTMLVideoElement>;
    player: Player;
    currentPlayInfo: IPlayInfo;
    autoPlay: boolean;
    randomPlay: boolean;
}

class VideoPlayer extends Component<Props, IState> {
    private myRef = React.createRef<HTMLVideoElement>();
    private readonly currentSeries: Series;

    constructor(props: Props) {
        super(props);
        this.currentSeries = this.props.series.find((serie: Series) => {
            return serie.number === this.props.seriesNumber;
        }) || this.props.series[0];

        this.state = {
            videoElementRef: this.myRef,
            player: new Player(this.currentSeries, this.onChangePart.bind(this), this.props.series),
            currentPlayInfo: {
                seriesIndex: this.props.seriesNumber -1,
                partIndex: 0
            },
            autoPlay: false,
            randomPlay: false
        }
        debugger;
    }

    componentDidMount() {
        this.state.player.create(
            this.state.videoElementRef.current as HTMLVideoElement)
    }

    componentWillUnmount() {
        this.state.player.destroy();
    }

    render() {
        return (
        <Row className="video-player">
            <div data-vjs-player>
                <video ref={this.myRef} className={"video-js"} />
            </div>
            <Row>
                <div className="random-section">
                    <label className="randomPlay-checkbox">
                        <input type="checkbox"
                               onChange={() => this.handleRandomPlayClick()}
                               checked={this.state.randomPlay}
                        />
                        RANDOM
                    </label>
                    <label className="autoplay-checkbox">
                        <input type="checkbox"
                                onChange={() => this.handleAutoPlayClick()}
                                checked={this.state.autoPlay}
                        />
                        AUTOPLAY
                    </label>
                </div>
                {this.renderPlayInfo()}
            </Row>
            <span>Díly</span>
            {this.renderPartButtons()}
        </Row>
        )
    }

    renderPartButtons() {
        let currentIndex = this.state.player.getIndex();

        return this.currentSeries.parts.map((part, index) => {
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
        this.setCurrentInfo(index);
    }

    setCurrentInfo(index: number) {
        this.setState({
            currentPlayInfo: {
                seriesIndex: this.props.seriesNumber - 1,
                partIndex: index
            }
        });
    }

    handleRandomPlayClick() {
        const randomPlay = !this.state.randomPlay;
        this.setState({
            randomPlay: randomPlay
        });
        this.state.player.setRandomPlay(randomPlay);
    }

    handleAutoPlayClick() {
        const autoplay = !this.state.autoPlay;
        this.setState({
            autoPlay: autoplay
        });
        this.state.player.setAutoPlay(autoplay);
    }

    renderPlayInfo() {
        const info = this.state.currentPlayInfo;

        return(
            <Row className="play-info">
                <span>{info.seriesIndex + 1}. Série - {info.partIndex + 1}. Díl</span>
                <br/>
                <span>{this.props.series[info.seriesIndex].parts[info.partIndex].name}</span>
            </Row>
        )
    }

    onChangePart(playInfo: IPlayInfo) {
        this.forceUpdate();
        this.setState({
            currentPlayInfo: playInfo
        })
    }
}

export default VideoPlayer;
