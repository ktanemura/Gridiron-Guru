<template>
  <div id="draft">
    <main-header></main-header>
    <div class="main-cnt">
      <el-row :gutter="20">
      <p>
          Draft Here <br>
          Rounds: {{this.$router.params}} <br>
          Teams: {{this.$router.params}} 
      </p>
      </el-row>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
  data() {
    return {
      draftInfoForm: {
        teams: 0,
        password: ''
      },
    };
  },
  methods: {
  }
}
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
