
export default {
  data: () => ({
    fr_voices: [],
    speachSynthesis: null,
  }),
  methods: {
    async fetchVoices() {
      let voices = await this.getVoices();
      this.fr_voices.push(voices[4]);
      this.fr_voices.push(voices[38]);
      this.fr_voices.push(voices[54]);
      const utterance = new SpeechSynthesisUtterance();
      utterance.lang = 'fr-CA';
      this.speachSynthesis = utterance;
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
      this.speachSynthesis.voice = this.fr_voices[index];
      this.speachSynthesis.text = text;
      speechSynthesis.speak(this.speachSynthesis);
    },
  }
}