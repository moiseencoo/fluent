<template>
  <LayoutMain>
    <template v-slot:navigation>
      <AppCompletion :day="currentDay + 1" @changeDay="handleChangeDay"/>
    </template>
    <template v-slot:content>
      <AppCard
        :title="getTitle"
        :answer="getAnswer"
        :day="currentDay + 1"
        :total="studyPlan.length"
        :index="currentIndex + 1"
        @play="speak(getAnswer)"
      />
      <AppInput :original="getAnswer" @solved="handleNext"/>
    </template>
  </LayoutMain>
</template>

<script>
import LayoutMain from "@/layouts/LayoutMain";
import AppCompletion from './AppCompletion';
import AppCard from './AppCard';
import AppInput from './AppInput';
import cards from '@/db/cards_fr.js';
import speech from "@/mixins/speech.js";

export default {
  name: 'AppMain',
  mixins: [ speech ],
  components: {
    LayoutMain,
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
      if (this.currentIndex % 10 === 0) {
        localStorage.setItem('index', this.currentIndex);
      }
      this.currentCard = this.studyPlan[this.currentIndex];
    },
    getLastSavedDay() {
      let day = localStorage.getItem('day');
      if (day) {
        this.currentDay = parseInt(day);
      }
      let index = localStorage.getItem('index');
      if (index) {
        this.currentIndex = parseInt(index);
      }
    },
    saveScore() {
      localStorage.setItem('day', this.currentDay);
      localStorage.setItem('index', 0);
    },
    createStudyPlan() {
      let { currentDay, cards } = this;
      this.studyPlan = [];
      for (let i = 0; currentDay - i >= 0 && i < 5; i++) {
        this.studyPlan.unshift(...this.getIteration(cards[currentDay - i]))
      }
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

</style>