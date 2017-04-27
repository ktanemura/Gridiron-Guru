
<template>
  <div id="app">
    <main-header></main-header>
    <div class="main-cnt">
      <el-row>
        <el-col :span="4">
          <main-sidenav></main-sidenav>
        </el-col>
        <el-col :span="20">
          <!-- <el-row class="el-row-breadcrumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">dashboard</el-breadcrumb-item>
              <el-breadcrumb-item>page</el-breadcrumb-item>
            </el-breadcrumb>
          </el-row> -->
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<head>
<script>
export default {
  data () {
    return {
      msg: 'Use Vue 2.0 Today!',
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
html, 
body {
    height: 100%;
}

body {
  margin: 0 0;
  font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',SimSun,sans-serif;
}

h1 {
  font-weight: 400;
}

h2 {
  font-size: 28px;
  font-weight: 400;
  color: #1f2f3d;
  margin: 0;
}

h3 {
  font-size: 22px;
  font-weight: 400;
  color: #1f2f3d;
  margin: 45px 0 15px;
}

a {
  text-decoration: none;
}

p {
  font-size: 14px;
  color: #5e6d82;
  line-height: 1.5em;
}

#app {
  margin-left: 30px;
  margin-right: 30px;
}

.el-row {
  margin-top: 10px;
  margin-bottom: 14px;
}
.el-row-breadcrumbs {
  margin-top: 6px;
}

.el-card {
  box-shadow: none;
}
</style>
