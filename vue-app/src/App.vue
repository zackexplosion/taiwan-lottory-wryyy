<template>
<el-container id="app">
  <el-header>好康的</el-header>
  <el-main><router-view/></el-main>
  <el-footer>來看了就知道</el-footer>
</el-container>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  max-width: 768px;
  margin: 0 auto;
  /* text-align: center; */
}
</style>
