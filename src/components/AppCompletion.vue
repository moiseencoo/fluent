<template>
  <div class="app-completion">
    <button v-for="index in 100"
        :key="index"
        :class="{completed: index < day, current: index == day}"
        class="app-completion-day"
        @click="$emit('changeDay', index - 1)">
      {{ index }}
    </button>

  </div>
</template>

<script>
export default {
  name: "AppCompletion",
  props: {
    day: Number,
  }
}
</script>

<style scoped>
.app-completion {
  display: flex;
  flex-wrap: wrap;
  height: 42px;
  overflow: hidden;
  margin-bottom: 30px;
}

.app-completion:hover {
  height: 100%;
}

.app-completion-day {
  width: 30px;
  height: 30px;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 3px #ccc;
  margin: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: backgroundColor 0.3s;
}

.app-completion-day.completed {
  background-color: #00D2FC;
  color: #fff;
}

.app-completion-day.current {
  background-color: #009EFA;
  color: #fff;
}

.app-completion-day:hover {
  background-color: #FEFEDF;
}

.app-completion-day:disabled {
  cursor: default;
  background-color: #fefefe;
}
</style>