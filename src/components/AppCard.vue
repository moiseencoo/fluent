<template>
  <div class="app-card">
    <svg
      class="app-show-answer"
      viewBox="0 0 512 512"
      @click="showAnswer = !showAnswer">
        <path class="cls-1" d="M256,421C147.78,421,49.91,358.72.58,258.51a5.7,5.7,0,0,1,0-5C49.91,153.28,147.78,91,256,91s206.09,62.26,255.42,162.47a5.7,5.7,0,0,1,0,5C462.09,358.72,364.22,421,256,421ZM12,256c47.78,94.82,141,153.6,244,153.6S452.17,350.82,500,256c-47.78-94.82-141-153.6-244-153.6S59.83,161.18,12,256Z"/><path class="cls-1" d="M256,352.71A96.71,96.71,0,1,1,352.71,256,96.82,96.82,0,0,1,256,352.71Zm0-182A85.33,85.33,0,1,0,341.33,256,85.43,85.43,0,0,0,256,170.67Z"/>
    </svg>
    <div class="app-current-counter">
      Day {{ day }} <br />
      <small>{{ index }} / {{ total }} </small>
    </div>
    <h2 class="app-card-title">{{ title }}</h2>
    <h6 v-if="showAnswer" class="app-answer">{{ answer }}</h6>
  </div>
</template>

<script>
export default {
  name: "AppCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    answer: String,
    day: Number,
    total: Number,
    index: Number,
  },
  data: () => ({
    showAnswer: false,
  })
}
</script>

<style scoped>
.app-card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  min-height: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin: auto;
  border-radius: 5px;
}

.app-current-counter {
  position: absolute;
  top: 30px;
  left: 30px;
}

.app-show-answer {
  width: 30px;
  cursor: pointer;
  position: absolute;
  top: 30px;
  right: 30px;
}

.app-answer {
  position: absolute;
  bottom: 10px;
  color: #777;
}
</style>