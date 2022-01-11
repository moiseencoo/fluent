<template>
  <div class="app-input">
    <textarea
      v-model="part"
      class="app-textarea"
      :class="{wrong: isWrong, correct: allCorrect}"
      @input="checkCompletion"
      ></textarea>
      <button class="record-btn" :class="{recording: listening}" @click="record">
        <img :src="micro" class="record-btn-icon"/>
      </button>
  </div>
</template>

<script>
import micro from "@/assets/record.svg";
import startRecording from "@/assets/record.mp3";
import recording from "@/mixins/recording.js";


export default {
  name: "AppInput",
  mixins: [ recording ],
  props: {
    answer: {
      type: String,
      required: true,
    }
  },
  data: () => ({
    part: '',
    allCorrect: false,
    speechRecognition: null,
    listening: false,
    micro,
  }),
  created() {
    this.createSpeechRecognition();
    this.sound = new Audio(startRecording);
  },
  computed: {
    isWrong() {
      if (!this.typedStr) return false;
      return this.typedStr !== this.originalSlicedStr;
    },
    originalSlicedStr() {
      return this.prepareStr(this.answer).slice(0, this.typedStr.length)
    },
    originalStr() {
      return this.prepareStr(this.answer)
    },
    typedStr() {
      return this.prepareStr(this.part);
    }
  },
  methods: {
    checkCompletion() {
      this.allCorrect = false;
      if (!this.isWrong && this.originalStr.length === this.typedStr.length) {
        this.allCorrect = true;
        this.$emit('solved');
        setTimeout(() => {
          this.part = "";
          this.allCorrect = false;
        }, 1000);
      }
    },
    record() {
      this.sound.play();
      this.speechRecognition.start();
    },
    prepareStr(str) {
      return str.replaceAll(/[.,?—]/g,'').toLowerCase();
    },
  }
}
</script>

<style scoped>
.app-input {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.app-textarea {
  width: 100%;
  height: 20px;
  max-width: 430px;
  border: 1px solid #00D2FC;
  border-radius: 5px;
  padding: 15px;
}

.app-textarea:focus {
  outline: none;
}

.app-textarea.wrong,
.app-textarea.wrong:focus {
  border-color: #D83121;
  background-color: rgba(216, 49, 33, 0.1);
}

.app-textarea.correct,
.app-textarea.correct:focus {
  border-color: #00C9A7;
  background-color: rgba(0, 201, 167, 0.1);
}

.record-btn {
  border: 0;
  background: #ccc;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin-left: 20px;
  transition: all 0.3s;
}

.record-btn.recording {
  background-color: #D5E9F1;
}

.record-btn-icon {
  width: 30px;
}
</style>