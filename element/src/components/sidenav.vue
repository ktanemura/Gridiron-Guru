<template>
<el-menu :default-active="this.$route.path" class="el-menu-side" :router="true" :unique-opened="true" @open="handleOpen" @close="handleClose">
  <el-menu-item index="/"><i class="el-icon-menu"></i>Dashboard</el-menu-item>
  <el-menu-item index="/aiprofiles"><i class="el-icon-menu"></i>AI Profiles</el-menu-item>
  <el-submenu>
    <template slot="title"><i class="el-icon-message"></i>Fantasy Teams</template>
    <el-menu-item index="/fantasyteamlist">Team List</el-menu-item>
    <el-menu-item index="/fantasylist">Fantasy List</el-menu-item>
  </el-submenu>
</el-menu>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
.el-menu-side {
  margin-right: 20px;
}
</style>