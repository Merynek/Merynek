import React, {Component, CSSProperties} from "react";
import {InView} from "react-intersection-observer";
import './photo.scss';

interface IPhotoProps {
    imgSrc: string;
    className?: string;
    onView?: () => void;
    rotate: string;
    text: string;
    imgStyle?: CSSProperties;
}

interface IPhotoState {
    inView: boolean;
}

class Photo extends Component<IPhotoProps, IPhotoState> {
    constructor(props: IPhotoProps) {
        super(props);
        this.state = {
            inView: false
        };
    }
    private _onChange = (inView: boolean) => {
        const { imgSrc, className, onView} = this.props;
        if (!this.state.inView) {
            setTimeout(() => {
                this.setState({
                    inView: inView
                })
            }, 300)
        }
    }


    render() {
        const { imgSrc, text, rotate, imgStyle} = this.props;
        return <InView
            className={"layout"}
            delay={1}
            threshold={0.2}
            style={{transform: `rotate(${rotate}deg)`}}
            root={null}
            onChange={this._onChange}>
            <div className={`wrapper`}>
                <div className={`photoWrapper invisible ${this.state.inView && "visible"}`}>
                    <img src={imgSrc} style={imgStyle} />
                    <p>{text}</p>
                </div>
            </div>
        </InView>
    }
}

export default Photo;