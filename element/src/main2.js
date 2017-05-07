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
var VueFire = require('vuefire');
var fb = require('firebase');

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

  var firebaseapp = fb.initializeApp(config);
  var db = firebaseapp.database();

export const firebase = fb;

export const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: Routes,
});

new Vue({
  el: '#app',
/*
  firebase: {
    anArray: db.ref('url/to/my/collection'),
    anObject: {
      source: db.ref('url/to/my/object'),
      // optionally bind as an object
      asObject: true,
      // optionally provide the cancelCallback
      cancelCallback: function () {}
    }
  },
*/
  render: h => h(App),
  router,
    data: {
      user: {
        email: 'kyletanemura@gmail.com',
        password: 'password',
      },
  },
  beforeCreate: function() {
    // Our earliest lifecycle hook and first access
    // to $bindAsArray() / $bindAsObject() from VueFire
    // Start Firebase authentication here:
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // Cache user - an anonymously authenticated firebase.User account
        //  - https://firebase.google.com/docs/reference/js/firebase.User
        this.user = user
        // Note: Child component instances will have access to these
        // references via this.$root.user and this.$root.messages
      } else {
        firebase.auth().signInWithEmailAndPassword('kyletanemura@gmail.com', 'password')
        this.$route.path = '/login'
      }
    }.bind(this))
  }
});
