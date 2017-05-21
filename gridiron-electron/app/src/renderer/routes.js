import Main from './pages/Main.vue'
import Dashboard from './pages/Main/Dashboard.vue'
import AIProfiles from './pages/Main/AIProfiles.vue'
import FantasyList from './pages/Main/FantasyList.vue'
import WeeklyReports from './pages/Main/WeeklyReports.vue'
import SignUp from './pages/Main/SignUp.vue'
import Settings from './pages/Main/Settings.vue'
import Login from './pages/Login.vue'

export default [
  {
    path: '/',
    redirect: '/dashboard',
    component: Main,
    meta: {
      reqAuth: true
    },
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        breadcrumb: 'dashboard',
        meta: {
          reqAuth: true
        }
      },
      {
        path: 'aiprofiles',
        component: AIProfiles,
        breadcrumb: 'aiprofiles',
        meta: {
          reqAuth: true
        }
      },
      {
        path: 'fantasylist',
        component: FantasyList,
        breadcrumb: 'fantasy list',
        meta: {
          reqAuth: true
        }
      },
      {
        path: 'weeklyreports',
        component: WeeklyReports,
        breadcrumb: 'weekly reports',
        meta: {
          reqAuth: true
        }
      },
      {
        path: 'settings',
        component: Settings,
        breadcrumb: 'settings',
        meta: {
          reqAuth: true
        }
      }
    ]
  },
  {
    path: '/signup',
    component: SignUp,
    breadcrumb: 'signup',
    meta: {
      reqAuth: false
    }
  },
  {
    path: '/login',
    component: Login,
    breadcrumb: 'login',
    meta: {
      reqAuth: false
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]