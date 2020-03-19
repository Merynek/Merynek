import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'font-awesome/scss/font-awesome.scss';
import { Series } from '../../components/Serials/source/serialJson';
import { KeyboardEvent } from 'react';
import { MeryRecognition } from '../SpeechRecognition/MeryRecognition';

interface IWindow extends Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
}

export interface IPlayInfo {
    seriesIndex: number;
    partIndex: number;
}

export class Player {
    private index: number;
    private series: Series;
    private allSeries: Series[];
    private onChangePart: (playInfo: IPlayInfo) => void;
    private videoJsPlayer!: videojs.Player;
    private options: videojs.PlayerOptions;
    private destroyed: boolean;
    private autoPlay: boolean;
    private meryRecognition: MeryRecognition|undefined;

    constructor(series: Series, onChangePart: (playInfo: IPlayInfo) => void, allSeries: Series[]) {
        this.index = 0;
        this.series = series;
        this.allSeries = allSeries;
        this.onChangePart = onChangePart;
        this.destroyed = false;
        this.autoPlay = false;
        this.options = this.getOptions();
        this.createSpeechRecognition();
    }

    private createSpeechRecognition() {
        const {webkitSpeechRecognition} : IWindow = <IWindow>window;
        const {SpeechRecognition} : IWindow = <IWindow>window;
        let isSuported = Boolean(webkitSpeechRecognition) || Boolean(SpeechRecognition);

        if (isSuported) {
            this.meryRecognition = new MeryRecognition();
            this.meryRecognition.setOnNextCallBack(this.next.bind(this));
            this.meryRecognition.setOnBackCallBack(this.previous.bind(this));
            this.meryRecognition.setOnPlayCallBack(this.play.bind(this));
            this.meryRecognition.setOnStopCallBack(this.pause.bind(this));
            return;
        }
        console.log("SpeechRecognition is not supported.");
    }

    public getIndex() {
        return this.index;
    }

    public setAutoPlay(autoplay: boolean) {
        this.autoPlay = autoplay;
    }

    public create(element: HTMLElement) {
        this.videoJsPlayer = videojs(element, this.options);
        this.videoJsPlayer.on("ended", () => {
            if (this.autoPlay) {
                this.playRandomVideo();
            }
        });
        this.createEvents();
        this.createButtons();
        this.pause();
    }

    public destroy() {
        this.videoJsPlayer.dispose();
        this.meryRecognition && this.meryRecognition.destroy();
        this.destroyed = true;
    }

    public setIndexAndPlay(index: number): void {
        this.index = index;
        this.playVideoByIndex();
    }

    public next(): void {
        if (this.index === this.series.parts.length -1) {
            return;
        }
        this.index++;
        this.playVideoByIndex();
    }

    public previous(): void {
        if (this.index === 0) {
            return;
        }
        this.index--;
        this.playVideoByIndex();
    }

    private createEvents(): void {
        window.addEventListener('keydown', e => {
            if (!this.destroyed) {
                this.keysHandler(<any>e);
            }
        });
    }

    private keysHandler(event: KeyboardEvent) {
        let key = event.which;
        let handled = false;

        switch(key) {
            case 32: //SPACE
                this.togglePlayer();
                handled = true;
                break;
            case 39: //ARROW_RIGHT
                this.setCurrentTime(5);
                handled = true;
                break;
            case 37: //ARROW_LEFT
                this.setCurrentTime(-5);
                handled = true;
                break;
            case 38: //ARROW_UP
                this.setVolume(0.1);
                handled = true;
                break;
            case 40: //ARROW_DOWN
                this.setVolume(-0.1);
                handled = true;
                break;
            case 78: //N key
                this.next();
                handled = true;
                break; 
        }

        if (handled) {
            event.preventDefault();
        }
    }

    private togglePlayer(): void {
        if (this.videoJsPlayer.paused()) {
            this.play();
        } else {
            this.pause();
        }
    }

    private play(): void {
        this.videoJsPlayer.play();
    }

    private pause(): void {
        this.videoJsPlayer.pause();
    }

    private setCurrentTime(seconds: number): void {
        this.videoJsPlayer.currentTime(this.videoJsPlayer.currentTime() + seconds);
    }

    private setVolume(volume: number): void {
        let currentVolume = this.videoJsPlayer.volume();

        this.videoJsPlayer.volume(currentVolume + volume);
    }

    private createButtons(): void {
        let previousButton = this.createButton("fa-step-backward");
        let forwardButton = this.createButton("fa-step-forward");

        previousButton.onclick = () => {
            this.previous();
        };

        forwardButton.onclick = () => {
            this.next();
        };
    }

    private playVideoByIndex(): void {
        this.videoJsPlayer.pause();
        this.videoJsPlayer.src(this.series.parts[this.index].link);
        this.play();
        this.onChangePart({
            seriesIndex: this.series.number - 1,
            partIndex: this.index
        });
    }

    public playRandomVideo() {
        const seriesIndex = Math.floor(Math.random() * this.allSeries.length);
        const series = this.allSeries[seriesIndex];
        const partIndex = Math.floor(Math.random() * series.parts.length);
        const part = this.allSeries[seriesIndex].parts[partIndex];

        this.videoJsPlayer.pause();
        this.videoJsPlayer.src(part.link);
        this.play();
        this.onChangePart({
            seriesIndex: seriesIndex,
            partIndex: partIndex
        });
    }

    private getOptions(): videojs.PlayerOptions {
        let hasParts = this.series.parts.length;

        return {
            autoplay: true,
            controls: true,
            sources: [
                {
                    src: hasParts ? this.series.parts[0].link : ""
                }
            ]
        };
    }

    private createButton(icon: string): HTMLElement {
        let controlBar,
            newElement = document.createElement('button'),
            iconElement = document.createElement('i'),
            insertBeforeNode;
    
        newElement.className = 'vjs-control';
    
        iconElement.className = "fa " + icon + " fa-lg";
        iconElement.setAttribute("aria-hidden", "true");
    
        newElement.appendChild(iconElement);
        controlBar = document.getElementsByClassName('vjs-control-bar')[0];
        insertBeforeNode = document.getElementsByClassName('vjs-volume-panel')[0];
        controlBar.insertBefore(newElement, insertBeforeNode);
    
        return newElement;
    }
}