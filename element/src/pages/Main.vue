<template>
  <div id="main">
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