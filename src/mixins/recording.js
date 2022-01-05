
export default {
  methods: {
    createSpeechRecognition() {
      let speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = 'fr-CA';
      this.speechRecognition = speechRecognition;

      this.speechRecognition.onstart = () => {
        this.loading = true;
      };
      this.speechRecognition.onerror = () => {
        console.log('error');
      };
      this.speechRecognition.onspeechend = () => {
        this.speechRecognition.stop();
      };
      this.speechRecognition.onend = () => {
        this.checkCompletion();
        this.loading = false;
      };

      this.speechRecognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.part = event.results[i][0].transcript;
          }
        }
      }
    },
  }
}