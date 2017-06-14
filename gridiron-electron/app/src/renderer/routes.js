import Main from './pages/Main.vue'
import Dashboard from './pages/Main/Dashboard.vue'
import AIProfiles from './pages/Main/AIProfiles.vue'
import FantasyList from './pages/Main/FantasyList.vue'
import SignUp from './pages/SignUp.vue'
import Settings from './pages/Main/Settings.vue'
import Login from './pages/Login.vue'
import CreateUsername from './pages/CreateUsername.vue'
import Draft from './pages/Main/Draft.vue'
import DraftInfo from './pages/Main/DraftInfo.vue'
import Leagues from './pages/Main/Leagues.vue'
import AddLeague from './pages/Main/AddLeague.vue'
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
        path: 'draftInfo',
        component: DraftInfo,
        breadcrumb: 'draftinfo',
        meta: {
          reqAuth: true
        }
      },
      {
        path: 'draft/:id',
        name: 'DRAFT',
        component: Draft,
        breadcrumb: 'draft',
        meta: {
          reqAuth: true
        }
      },
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
        path: 'leagues',
        component: Leagues,
        breadcrumb: 'leagues',
        meta: {
          reqAuth: true
        }
      },
      {
        path: 'leagues/add',
        component: AddLeague,
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
    path: '/createusername',
    component: CreateUsername,
    breadcrumb: 'createusername',
    meta: {
      reqAuth: true
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
/*  {
    path: '/draftInfo',
    component: DraftInfo,
    breadcrumb: 'draftinfo',
    meta: {
      reqAuth: true
    }
  },
  {
    path: '/draft/:id',
    name: 'DRAFT',
    component: Draft,
    breadcrumb: 'draft',
    meta: {
      reqAuth: true
    }
  },
*/
  {
    path: '*',
    redirect: '/'
  }
]
