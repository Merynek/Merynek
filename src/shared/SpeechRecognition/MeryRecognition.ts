export interface IWindow extends Window {
    webkitSpeechRecognition: any;
  }

export class MeryRecognition {
    private recognition: any;
    
    constructor() {
        const {webkitSpeechRecognition} : IWindow = <IWindow>window;
        this.recognition = new webkitSpeechRecognition();

        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = "en-US";
        this.recognition.onresult = (event: any) => {
          // do something with event.results
          console.log(event.results[0][0].transcript);
        }
        this.recognition.start();
    }
}