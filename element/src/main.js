import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResoure from 'vue-resource';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './App.vue';
import Routes from './routes';

import MainHeader from './components/header.vue';
import MainSidenav from './components/sidenav.vue';
import MainFooter from './components/footer.vue';
//var VueFire = require('vuefire');
import Firebase from 'firebase';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.component('main-header', MainHeader);
Vue.component('main-sidenav', MainSidenav);
Vue.component('main-footer', MainFooter);

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCI2wCtuTZkcrJmU2InHNFfmXDhzjisbfk",
    authDomain: "gridiron-gurus.firebaseapp.com",
    databaseURL: "https://gridiron-gurus.firebaseio.com",
    projectId: "gridiron-gurus",
    storageBucket: "gridiron-gurus.appspot.com",
    messagingSenderId: "811469506152"
  };

  var firebaseapp = Firebase.initializeApp(config);
  var db = firebaseapp.database();

export const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: Routes,
});

router.beforeEach((to, from, next) => {
  console.log("Method called");
  if (to.matched.some(record => record.meta.reqAuth)) {
    console.log("Auth required");
    var user = Firebase.auth().currentUser;
    if (!user) {
      console.log("redirect to login");
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      console.log("user authenticated");
      next();
    }
  } else {
    console.log("Auth not required");
    next();
  }
});

const unsubscribe = firebaseapp.auth().onAuthStateChanged((user) => {
  new Vue({
    el: '#app',
    render: h => h(App),
    router,
  });

  // stop listening
  unsubscribe();
});