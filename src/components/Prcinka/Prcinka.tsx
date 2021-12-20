import React, {Component} from "react";
import Photo from "./components/photo";
import PradedImg from "./images/praded.jpg";
import './prcinka.scss';

class Prcinka extends Component {
    render() {

        return (
            <div className="prcinka">
                <div className={"line"}>
                    <div className={"item"}>
                        <Photo imgSrc={PradedImg} rotate={"-15"} text={"Image #1"} />
                    </div>
                    <div className={"item"}>
                        <Photo imgSrc={PradedImg} rotate={"15"} text={"Image #2"} />
                    </div>
                </div>
                <div className={"line"}>
                    <div className={"item"}>
                        <Photo imgSrc={PradedImg} rotate={"-15"} text={"Image #1"} />
                    </div>
                    <div className={"item"}>
                        <Photo imgSrc={PradedImg} rotate={"15"} text={"Image #2"} />
                    </div>
                </div>
                <div className={"line"}>
                    <div className={"item"}>
                        <Photo imgSrc={PradedImg} rotate={"-15"} text={"Image #1"} />
                    </div>
                    <div className={"item"}>
                        <Photo imgSrc={PradedImg} rotate={"15"} text={"Image #2"} />
                    </div>
                </div>
                <div className={"line"}>
                    <div className={"item"}>
                        <Photo imgSrc={PradedImg} rotate={"-15"} text={"Image #1"} />
                    </div>
                    <div className={"item"}>
                        <Photo imgSrc={PradedImg} rotate={"15"} text={"Image #2"} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Prcinka;