import React, { Component } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'font-awesome/scss/font-awesome.scss';

const videos = [
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "http://techslides.com/demos/sample-videos/small.mp4",
    "http://vjs.zencdn.net/v/oceans.mp4"
]
let index = 0;


const videoJsOptions: videojs.PlayerOptions = {
    autoplay: true,
    controls: true,
    sources: [
        {
            src: videos[0]
        }
    ]
  };

interface IData {
    player: videojs.Player,
    icon: string
}

function addNewButton(data: IData) {

    var myPlayer = data.player,
        controlBar,
        newElement = document.createElement('button'),
        icon = document.createElement('i'),
        insertBeforeNode;

    newElement.className = 'downloadStyle vjs-control';

    icon.className = "fa " + data.icon + " fa-lg";
    icon.setAttribute("aria-hidden", "true");

    newElement.appendChild(icon);
    controlBar = document.getElementsByClassName('vjs-control-bar')[0];
    insertBeforeNode = document.getElementsByClassName('vjs-volume-panel')[0];
    controlBar.insertBefore(newElement, insertBeforeNode);

    return newElement;

}

class VideoPlayer extends Component {
    private videoElement: HTMLVideoElement | null;
    private player!: videojs.Player;

    constructor(props: any) {
        super(props);
        this.videoElement =  document.createElement('video');
    }

    private onEnded() {
        this.player.src('http://vjs.zencdn.net/v/oceans.mp4');
        this.player.play();
    }

    private next() {
        index++;
        this.player.pause();
        this.player.src(videos[index]);
        this.player.play();
    }
    private previous() {
        index--;
        this.player.pause();
        this.player.src(videos[index]);
        this.player.play();
    }

    componentDidMount() {
        // instantiate Video.js
        this.player = videojs(this.videoElement, videoJsOptions, function onPlayerReady() {
        });
       //  this.player.on("ended", this.onEnded.bind(this));

        var backButton = addNewButton({
            player: this.player,
            icon: "fa-step-backward"
        });

        var forwardButton = addNewButton({
            player: this.player,
            icon: "fa-step-forward"
        });

        backButton.onclick = () => {
            this.previous();
        };

        forwardButton.onclick = () => {
            this.next();
        };
    }
    
      // destroy player on unmount
    componentWillUnmount() {
       /* if (this.player) {
          this.player.dispose()
        }*/
    }
      // wrap the player in a div with a `data-vjs-player` attribute
      // so videojs won't create additional wrapper in the DOM
      // see https://github.com/videojs/video.js/pull/3856
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
