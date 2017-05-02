import Index from './pages/Index.vue';
import AIProfiles from './pages/AIProfiles.vue';
/*import FantasyTeamList from './pages/FantasyTeamList.vue';*/
import FantasyList from './pages/FantasyList.vue';
import WeeklyReports from './pages/WeeklyReports.vue';
import Login from './pages/Login.vue';

export default [
  {
    path: '/',
    component: Index,
    breadcrumb: 'dashboard',
    auth: true,
  },
  {
    path: '/aiprofiles',
    component: AIProfiles,
    breadcrumb: 'aiprofiles',
    auth: true,
  },
 /* {
    path: '/fantasyteamlist',
    component: FantasyTeamList,
    breadcrumb: 'fantasy team list',
  },*/
  {
    path: '/fantasylist',
    component: FantasyList,
    breadcrumb: 'fantasy list',
    auth: true,
  },
  {
    path: '/weeklyreports',
    component: WeeklyReports,
    breadcrumb: 'weekly reports',
  },
  {
    path: '/login',
    component: Login,
    breadcrumb: 'login',
    auth: false,
  },
];
