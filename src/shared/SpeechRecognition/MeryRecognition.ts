export interface IWindow extends Window {
    webkitSpeechRecognition: any;
}
const COMMAND_GREETING = ["hey mary", "hail mary", "hi mary", "how many", "emery", "how many how many", "hey matty", "hey marine"];
const COMMAND_NEXT = ["next"];
const COMMAND_BACK = ["back", "beck"];
const SAY_GREETING = "Hello";


export class MeryRecognition {
    private recognition: any;
    private onNext: () => void = () => {};
    private onBack: () => void = () => {};
    private speechSynthesis!: SpeechSynthesisUtterance;
    private listening!: boolean;
    private working!: boolean;
    private index!: number;
    private destroyed!: boolean;
    
    constructor() {
        const {webkitSpeechRecognition} : IWindow = <IWindow>window;
        let isWebkit = webkitSpeechRecognition;
        this.recognition = isWebkit ? new webkitSpeechRecognition() : new SpeechRecognition();
        this.speechSynthesis = new SpeechSynthesisUtterance();
        this.speechSynthesis.rate = 0.6;
        this.speechSynthesis.volume = 1;
        this.listening = false;
        this.working = false;
        this.destroyed = false;
        this.index = 0;
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = "en-US";
        this.recognition.onresult = (event: any) => {
            if (!this.inProgress()) {
                this.resolveResult(event);
            }
        }
        this.recognition.onend = (event: any) => {
            if (!this.destroyed) {
                this.index = 0;
                this.recognition.start();
            }
        }
        this.recognition.start();
    }

    public destroy() {
        this.destroyed = true;
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
      this.working = true;
        if (event.results[this.index].isFinal) {
          let speech = event.results[this.index][0].transcript.trim().toLowerCase();
          console.log(speech);
          if (this.listening) {
            this.resolveCommands(speech);
          } else {
            if (COMMAND_GREETING.indexOf(speech) > -1) {
              this.startListening()
            }
          }
          this.index++;
        }
      
      this.working = false;
    }

    private inProgress() {
      return this.working;
    }

    private say(msg: string) {
      this.speechSynthesis.text = msg;
      window.speechSynthesis.speak(this.speechSynthesis);
    }

    private startListening() {
      this.say(SAY_GREETING);
      this.listening = true;
      this.wait();
    }

    private stopListening() {
      this.listening = false;
    }

    private wait() {
      setTimeout(() => {
        this.stopListening();
      }, 4000);
    }

    private resolveCommands(speech: string) {
      if (COMMAND_NEXT.indexOf(speech) > -1) {
        this.onNext();
        return;
      }
      if (COMMAND_BACK.indexOf(speech) > -1) {
        this.onBack();
        return;
      }
    }
}