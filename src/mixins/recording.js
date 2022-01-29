
export default {
  methods: {
    createSpeechRecognition() {
      let speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = 'fr-CA';
      speechRecognition.maxAlternatives = 3;
      this.speechRecognition = speechRecognition;

      this.speechRecognition.onstart = () => {
        this.listening = true;
      };
      this.speechRecognition.onerror = () => {
        console.log('error');
      };
      this.speechRecognition.onspeechend = () => {
        this.speechRecognition.stop();
      };
      this.speechRecognition.onend = () => {
        this.checkCorrectness();
        this.listening = false;
      };

      this.speechRecognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.alternatives = event.results[i];
            this.part = event.results[i][0].transcript;
          }
        }
      }
    },
  }
}