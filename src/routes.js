import { UsersApp } from './pages/UsersApp';
import { UserEdit } from './pages/UserEdit';

const routes = [
  {
    path: '/',
    component: UsersApp,
    label: 'UsersApp',
  },
  {
    path: '/user/edit/:id?',
    component: UserEdit,
    label: 'UsersEdit',
  },
];

export default routes;
