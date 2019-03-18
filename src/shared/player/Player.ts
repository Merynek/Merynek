import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'font-awesome/scss/font-awesome.scss';

export class Player {
    private index: number;
    private videoList: string[];
    private videoJsPlayer!: videojs.Player;
    private options: videojs.PlayerOptions;

    constructor(serials: string[]) {
        this.index = 0;
        this.videoList = serials;
        this.options = this.getOptions();
    }

    public create(element: HTMLElement) {
        this.videoJsPlayer = videojs(element, this.options);
        this.videoJsPlayer.on("ended", () => {
            this.next();
        });
        this.createButtons();
    }

    public destroy() {
        this.videoJsPlayer.dispose();
    }

    public next(): void {
        if (this.index === this.videoList.length) {
            return;
        }
        this.index++;
        this.playVideoByIndex();
    }

    public previous(): void {
        if (this.index) {
            return;
        }
        this.index--;
        this.playVideoByIndex();
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
        this.videoJsPlayer.src(this.videoList[this.index]);
        this.videoJsPlayer.play();
    }

    private getOptions(): videojs.PlayerOptions {
        return {
            autoplay: true,
            controls: true,
            sources: [
                {
                    src: this.videoList[0]
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