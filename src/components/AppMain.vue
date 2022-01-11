<template>
  <div class="app-main">
    <AppCompletion :day="currentDay + 1" @changeDay="handleChangeDay"/>
    <AppCard
      :title="getTitle"
      :answer="getAnswer"
      :day="currentDay + 1"
      :total="studyPlan.length"
      :index="currentIndex + 1"
      @play="speak(getAnswer)"
    />
    <AppInput :answer="getAnswer" @solved="handleNext"/>
  </div>
</template>

<script>
import AppCompletion from './AppCompletion';
import AppCard from './AppCard';
import AppInput from './AppInput';
import cards from '@/db/cards.js';
import speech from "@/mixins/speech.js";

export default {
  name: 'AppMain',
  mixins: [ speech ],
  components: {
    AppCompletion,
    AppCard,
    AppInput,
  },
  data: () => ({
    cards,
    currentCard: {},
    currentDay: 0,
    currentIndex: 0,
    studyPlan: [],
    completed: false,
  }),
  async created() {
    await this.getLastSavedDay();
    this.createStudyPlan();
    this.updateCurrentCard();
    await this.fetchVoices();
  },
  computed: {
    getTitle() {
      if (!this.completed) {
        return this.getKey;
      }
      return "На сегодня всё)";
    },
    getKey() {
      return Object.keys(this.currentCard)[0];
    },
    getAnswer() {
      return this.currentCard[this.getKey];
    }
  },
  methods: {
    handleNext() {
      this.speak(this.getAnswer);
      setTimeout(() => {
        if (this.currentIndex + 1 === this.studyPlan.length) {
          this.currentDay++;
          this.completed = true;
          this.saveScore();
        } else {
          this.currentIndex++;
        }
        this.updateCurrentCard();
      }, 1000);
    },
    handleChangeDay(index) {
      this.currentDay = index;
      this.createStudyPlan();
      this.updateCurrentCard();
      this.saveScore();
    },
    updateCurrentCard() {
      this.currentCard = this.studyPlan[this.currentIndex];
    },
    getLastSavedDay() {
      let day = localStorage.getItem('day');
      if (day) {
        this.currentDay = parseInt(day);
      }
    },
    saveScore() {
      localStorage.setItem('day', this.currentDay);
    },
    createStudyPlan() {
      let { currentDay, cards } = this;
      this.studyPlan = [];
      for (let i = 1; currentDay - i >= 0 && i < 5; i++) {
        this.studyPlan.unshift(...cards[currentDay - i]);
      }
      let iteration = this.getIteration(cards[currentDay]);
      this.studyPlan.push(...iteration);
    },
    getIteration(arr) {
      let result = [];
      for (let i = 0; i < arr.length + 5; i++) {
        if (i < 5) {
          result.push(arr[i]);
        } else if (i < 10) {
          result.push(arr[i - 4]);
          result.push(arr[i - 3]);
          result.push(arr[i - 2]);
          result.push(arr[i - 1]);
          result.push(arr[i]);
        } else if (i == 10){
          result.push(arr[i - 4]);
          result.push(arr[i - 3]);
          result.push(arr[i - 2]);
          result.push(arr[i - 1]);
          result.push(arr[i - 10]);
        } else if (i == 11){
          result.push(arr[i - 4]);
          result.push(arr[i - 3]);
          result.push(arr[i - 2]);
          result.push(arr[i - 11]);
          result.push(arr[i - 10]);
        } else if (i == 12){
          result.push(arr[i - 4]);
          result.push(arr[i - 3]);
          result.push(arr[i - 12]);
          result.push(arr[i - 11]);
          result.push(arr[i - 10]);
        } else if (i == 13){
          result.push(arr[i - 4]);
          result.push(arr[i - 13]);
          result.push(arr[i - 12]);
          result.push(arr[i - 11]);
          result.push(arr[i - 10]);
        }
      }
      return result;
    },
  }
}
</script>

<style scoped>
.app-main {
  display: flex;
  flex-direction: column;
}
</style>