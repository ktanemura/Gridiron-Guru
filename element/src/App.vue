<style>
html, 
body {
    height: 100%;
}
body {
  margin: 0 0;
}
#app {
  margin-left: 30px;
  margin-right: 30px;
}
</style>

<template>
  <div id="app">
    <main-header></main-header>
    <div class="main-cnt">
      <el-row>
        <el-col :span="4">
          <main-sidenav></main-sidenav>
        </el-col>
        <el-col :span="20">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Use Vue 2.0 Today!'
    }
  },

  methods: {
    startHacking () {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 6000
      });
    },
  },
};
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
