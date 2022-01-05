
export default {
  methods: {
    async fetchVoices() {
      let voices = await this.getVoices();
      this.fr_voices.push(voices[4]);
      this.fr_voices.push(voices[38]);
      this.fr_voices.push(voices[54]);
    },
    getVoices() {
      return new Promise((resolve) => {
        let voices = speechSynthesis.getVoices();
        if (voices.length) {
          resolve(voices);
          return;
        }
        speechSynthesis.onvoiceschanged = () => {
          voices = speechSynthesis.getVoices();
          resolve(voices);
        }
      })
    },
    speak(text) {
      let index = Math.floor(Math.random() * 3);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-CA';
      utterance.voice = this.fr_voices[index];
      speechSynthesis.speak(utterance);
    },
  }
}