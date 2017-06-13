import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResoure from 'vue-resource';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Routes from './routes';
import {fireInit} from './firebaseHelper';
import App from './App.vue';
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
var authenticated = true
fireInit(fireStatus)

export const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: Routes,
  linkActiveClass: 'active',
});
/*
router.beforeEach(function (transition) {
  if (transition.to.auth && !authenticated) {
     transition.redirect('/login')
  } else {
    transition.next()
  }
})
*/
function fireStatus(loggedIn, user) {
    if (loggedIn) {
      authenticated = true
    } else {
      authenticated = false
    }
    // start app after we know login status
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
      router
    });
}