<template>
  <div class="layout-main">
    <div class="layout-navigation">
      <slot name="navigation"></slot>
    </div>
    <div class="layout-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutMain",
}
</script>

<style scoped>
.layout-main {
  display: flex;
}

.layout-navigation {
  width: 250px;
  height: 100vh;
  padding-top: 30px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
}

.layout-content {
  flex: 2;
  padding-top: 100px;
}
</style>