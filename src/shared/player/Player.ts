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

export class Player {
    private index: number;
    private series: Series;
    private onChangePart: () => void;
    private videoJsPlayer!: videojs.Player;
    private options: videojs.PlayerOptions;
    private destroyed: boolean;
    private meryRecognition: MeryRecognition|undefined;

    constructor(series: Series, onChangePart: () => void) {
        this.index = 0;
        this.series = series;
        this.onChangePart = onChangePart;
        this.destroyed = false;
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
            return;
        }
        console.log("SpeechRecognition is not supported.");
    }

    public getIndex() {
        return this.index;
    }

    public create(element: HTMLElement) {
        this.videoJsPlayer = videojs(element, this.options);
        this.videoJsPlayer.on("ended", () => {
            // this.next();
        });
        this.createEvents();
        this.createButtons();
        this.videoJsPlayer.pause();
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
            this.videoJsPlayer.play();
        } else {
            this.videoJsPlayer.pause();
        }
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
        this.videoJsPlayer.play();
        this.onChangePart();
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