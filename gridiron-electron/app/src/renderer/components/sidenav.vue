<template>
<el-menu :default-active="this.$route.path" class="el-menu-side" :router="true" :unique-opened="true" @open="handleOpen" @close="handleClose">
  <el-menu-item index="/dashboard"><i class="el-icon-menu"></i>Dashboard</el-menu-item>
  <el-menu-item index="/aiprofiles"><i class="el-icon-menu"></i>AI Profiles</el-menu-item>
  <el-menu-item index="/leagues"><i class="el-icon-menu"></i>Leagues</el-menu-item>
  <!-- <el-menu-item index="/login"><i class="el-icon-menu"></i>Login</el-menu-item> -->
  <el-menu-item index="/draftInfo"><i class="el-icon-menu"></i>Draft</el-menu-item>
  <el-menu-item index="/fantasylist"><i class="el-icon-menu"></i>Fantasy List</el-menu-item>
</el-menu>
</template>

<script>
  export default {
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style scoped>
.el-menu-side {
  margin-right: 20px;
}
</style>
