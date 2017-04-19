import Index from './pages/Index.vue';
import AIProfiles from './pages/AIProfiles.vue';
import FantasyTeamList from './pages/FantasyTeamList.vue';

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
];
