<style scoped>
.el-menu-top {
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>

<template>
<el-menu theme="light" :router="true" class="el-menu-top" mode="horizontal">
  <el-menu-item index="1">Gridiron</el-menu-item>
  <el-submenu v-if="this.$route.path != '/login'" style="float: right" index="2">
    <template slot="title"><i class="el-icon-setting"></i></template>
    <el-menu-item index="/settings" >Settings</el-menu-item>
    <el-menu-item index="2-2" @click="logout()">Logout</el-menu-item>
  </el-submenu>
  <!-- <el-submenu index="2">
    <template slot="title">Workspace</template>
    <el-menu-item index="2-1">item one</el-menu-item>
    <el-menu-item index="2-2">item two</el-menu-item>
    <el-menu-item index="2-3">item three</el-menu-item>
  </el-submenu>
  <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item> -->
</el-menu>
</template>

<script>
import firebase from 'firebase';

export default {
  data () {
    return {
      active: '',
      isHome: false,
      headerStyle: {}
    };
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler() {
        this.isHome = /^home/.test(this.$route.name);
        this.headerStyle.backgroundColor = `rgba(32, 160, 255, ${ this.isHome ? '0' : '1' })`;
      }
    }
  },
  /*computed: {
    lang() {
      return this.$route.path.split('/')[1] || 'zh-CN';
    },
    langConfig() {
      return compoLang.filter(config => config.lang === this.lang)[0]['header'];
    }
  },*/
  methods: {
    /*switchLang(targetLang) {
      if (this.lang === targetLang) return;
      localStorage.setItem('ELEMENT_LANGUAGE', targetLang);
      this.$router.push(this.$route.path.replace(this.lang, targetLang));
    }*/
    logout() {
      firebase.auth().signOut().then(function() {
        console.log('Signed out');
        location.reload();
      }, function(err) {  
        console.error('Sign out error', error);
      })
    },
  },
  mounted() {
    function scroll(fn) {
      window.addEventListener('scroll', () => {
        fn();
      }, false);
    }
    scroll(() => {
      if (this.isHome) {
        const threshold = 200;
        let alpha = Math.min((document.documentElement.scrollTop || document.body.scrollTop), threshold) / threshold;
        this.$refs.header.style.backgroundColor = `rgba(32, 160, 255, ${ alpha })`;
      }
    });
  }
};
</script>