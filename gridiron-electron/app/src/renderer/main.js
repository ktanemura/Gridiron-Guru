import Firebase from 'firebase'

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'

import App from './App'
import routes from './routes'

import MainHeader from './components/header.vue'
import MainSidenav from './components/sidenav.vue'
import MainFooter from './components/footer.vue'

import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })
Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.component('main-header', MainHeader)
Vue.component('main-sidenav', MainSidenav)
Vue.component('main-footer', MainFooter)
Vue.config.debug = true

// firebase init
var config = {
  apiKey: 'AIzaSyCI2wCtuTZkcrJmU2InHNFfmXDhzjisbfk',
  authDomain: 'gridiron-gurus.firebaseapp.com',
  databaseURL: 'https://gridiron-gurus.firebaseio.com',
  projectId: 'gridiron-gurus',
  storageBucket: 'gridiron-gurus.appspot.com',
  messagingSenderId: '811469506152'
}

// Firebase.initializeApp(config)
var firebaseApp = Firebase.initializeApp(config)
var firebaseDb = firebaseApp.database()
var firebase = Firebase
export {firebaseDb, firebase}

// router init
const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

router.beforeEach((to, from, next) => {
  console.log('router.beforeEach call')
  if (to.matched.some(record => record.meta.reqAuth)) {
    console.log('Auth required')
    var user = Firebase.auth().currentUser
    if (!user) {
      console.log('redirect to login')
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      console.log('User authenticated')
      next()
    }
  } else {
    console.log('Auth not required')
    if (to.path === '/login') {
      if (Firebase.auth().currentUser) {
        next({
          path: '/dashboard'
        })
      }
    }
    next()
  }
})

const unsubscribe = Firebase.auth().onAuthStateChanged((user) => {
  console.log('Firebase onAuthStateChanged')
  /* new Vue({
    el: '#app',
    render: h => h(App),
    router
  }) */

  new Vue({
    router,
    ...App
  }).$mount('#app')

  // stop listening
  unsubscribe()
})

// vue init
/* eslint-disable no-new */

