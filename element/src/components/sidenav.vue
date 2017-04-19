<style scoped>
.el-menu-side {
  margin-right: 20px;
}
</style>

<template>
<el-menu :default-active="this.$route.path" class="el-menu-side" :router="true" @open="handleOpen" @close="handleClose">
  <el-menu-item index="/" @click="handleClick"><i class="el-icon-menu"></i>Dashboard</el-menu-item>
  <el-menu-item index="/aiprofiles"><i class="el-icon-menu"></i>AI Profiles</el-menu-item>
  <el-submenu>
    <template slot="title"><i class="el-icon-message"></i>Navigator One</template>
    <el-menu-item-group title="Group One">
      <el-menu-item index="1-1">item one</el-menu-item>
      <el-menu-item index="1-2">item one</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="Group Two">
      <el-menu-item index="1-3">item three</el-menu-item>
    </el-menu-item-group>
    <el-submenu index="1-4">
      <template slot="title">item four</template>
      <el-menu-item index="1-4-1">item one</el-menu-item>
    </el-submenu>
  </el-submenu>
</el-menu>
</template>

<script>
  export default {
    methods: {
      handleClick() {
        console.log(this.$route.path);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>