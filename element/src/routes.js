import Index from './pages/Index.vue';
import AIProfiles from './pages/AIProfiles.vue';
import FantasyTeamList from './pages/FantasyTeamList.vue';
import FantasyList from './pages/FantasyList.vue';

export default [
  {
    path: '/',
    component: Index,
  },
    {
    path: '/AIProfiles',
    component: AIProfiles,
  },
  {
    path: '/FantasyTeamList',
    component: FantasyTeamList,
  },
  {
    path: '/FantasyList',
    component: FantasyList,
  },
];
