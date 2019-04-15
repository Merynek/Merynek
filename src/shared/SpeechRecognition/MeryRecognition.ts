export interface IWindow extends Window {
    webkitSpeechRecognition: any;
}
const COMMAND_GREETING = ["hey mary", "hail mary", "hi mary", "how many", "emery", "how many how many", "hey matty"];
const COMMAND_NEXT = ["next"];
const SAY_GREETING = "Hello sweetie";


export class MeryRecognition {
    private recognition: any;
    private onNext: () => void = () => {};
    private speechSynthesis: SpeechSynthesisUtterance;
    private listening: boolean;
    private working: boolean;
    private index: number;
    
    constructor() {
        const {webkitSpeechRecognition} : IWindow = <IWindow>window;
        this.recognition = new webkitSpeechRecognition();
        this.speechSynthesis = new SpeechSynthesisUtterance();
        this.speechSynthesis.rate = 0.5;
        this.speechSynthesis.volume = 1;
        this.listening = false;
        this.working = false;
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
          this.index = 0;
          this.recognition.start();
        }
        this.recognition.start();
    }

    public setCallBack(callback: () => void) {
        this.onNext = callback;
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
      }, 5000);
    }

    private resolveCommands(speech: string) {
      if (COMMAND_NEXT.indexOf(speech) > -1) {
        this.onNext();
      }
    }
}