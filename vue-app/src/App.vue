<template>
  <el-container id="app">
    <!-- <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header> -->
    <el-main><router-view/></el-main>
    <!-- <el-footer>來看了就知道</el-footer> -->
  </el-container>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  max-width: 1024px;
  margin: 0 auto;
  /* text-align: center; */
}
</style>
