export interface IWindow extends Window {
    webkitSpeechRecognition: any;
}
const COMMAND_GREETING = ["hey mary", "hail mary", "hi mary", "how many", "emery", "how many how many", "hey matty", "hey marine"];
const COMMAND_NEXT = ["next"];
const COMMAND_BACK = ["back", "beck"];

export class MeryRecognition {
    private recognition: any;
    private onNext: () => void = () => {};
    private onBack: () => void = () => {};
    private listening!: boolean;
    private working!: boolean;
    private destroyed!: boolean;
    private audio: HTMLAudioElement;
    
    constructor() {
        const {webkitSpeechRecognition} : IWindow = <IWindow>window;
        let isWebkit = webkitSpeechRecognition;
        this.recognition = isWebkit ? new webkitSpeechRecognition() : new SpeechRecognition();
        this.listening = false;
        this.working = false;
        this.destroyed = false;
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = "en-US";
        this.audio = document.body.appendChild(document.createElement("audio"));
        this.recognition.onresult = (event: any) => {
            if (!this.inProgress()) {
                this.resolveResult(event);
            }
        }
        this.recognition.onend = (event: any) => {
            if (!this.destroyed) {
                this.recognition.start();
            }
        }
        this.recognition.start();
    }

    public destroy() {
        this.destroyed = true;
        document.body.removeChild(this.audio);
        this.recognition.abort();
        this.recognition.stop();
    }

    public setOnNextCallBack(callback: () => void) {
        this.onNext = callback;
    }

    public setOnBackCallBack(callback: () => void) {
        this.onBack = callback;
    }

    private resolveResult(event: any) {
        for (let i = 0; i < event.results.length; i++) {
            let speech = event.results[i][0].transcript.trim().toLowerCase();

            console.log(speech);
            if (this.listening) {
                if (this.resolveCommands(speech)) {
                    let audio = new Audio(require("../Sounds/dobre.m4a"));
                    audio.play();
                    
                    this.recognition.stop();
                    break;
                }
            } else {
                if (this.containString(speech, COMMAND_GREETING)) {
                    this.startListening();
                    this.recognition.stop();
                    break;
                }
            }
        }
    }

    private containString(speech: string, command: string[]): boolean {
        for (let i = 0; i < command.length; i++) {
            if (speech.includes(command[i])) {
                return true;
            }
        }
        return false;
    }

    private inProgress() {
        return this.working;
    }

    private startListening() {
        this.audio.src = require("../Sounds/coje.m4a");
        this.audio.play();
        this.listening = true;
        this.wait();
    }

    private stopListening() {
        this.listening = false;
    }

    private wait() {
        setTimeout(() => {
            this.stopListening();
        }, 5000);
    }

    private resolveCommands(speech: string): boolean {
        if (this.containString(speech, COMMAND_NEXT)) {
            this.stopListening();
            this.onNext();
            return true;
        }
        if (this.containString(speech, COMMAND_BACK)) {
            this.stopListening();
            this.onBack();
            return true;
        }
        return false;
    }
}