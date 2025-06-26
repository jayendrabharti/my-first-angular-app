import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Signup } from './signup/signup';
import { Account } from './account/account';
import { Todos } from './todos/todos';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home',
  },
  {
    path: 'about',
    component: About,
    title: 'About Us',
  },
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },
  {
    path: 'signup',
    component: Signup,
    title: 'Sign up',
  },
  {
    path: 'account',
    component: Account,
    title: 'Account',
  },
  {
    path: 'dashboard',
    component: Dashboard,
    title: 'Dashboard',
  },
  {
    path: 'todos',
    component: Todos,
    title: 'ToDos',
  },
];
