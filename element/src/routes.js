import Index from './pages/Index.vue';
import AIProfiles from './pages/AIProfiles.vue';
import FantasyTeamList from './pages/FantasyTeamList.vue';
import FantasyList from './pages/FantasyList.vue';

export default [
  {
    path: '/',
    component: Index,
    breadcrumb: 'dashboard',
  },
  {
    path: '/aiprofiles',
    component: AIProfiles,
    breadcrumb: 'aiprofiles',
  },
  {
    path: '/fantasyteamlist',
    component: FantasyTeamList,
    breadcrumb: 'fantasy team list',
  },
  {
    path: '/fantasylist',
    component: FantasyList,
    breadcrumb: 'fantasy list',
  },
];
