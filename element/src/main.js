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

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.component('main-header', MainHeader);
Vue.component('main-sidenav', MainSidenav);
Vue.component('main-footer', MainFooter);

export const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: Routes,
});

new Vue({
  el: '#app',
  render: h => h(App),
  router
});
