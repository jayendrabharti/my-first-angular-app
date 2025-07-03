import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Signup } from './pages/signup/signup';
import { Account } from './pages/account/account';
import { authGuard } from './guards/auth-guard';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    canActivateChild: [authGuard],
    children: [
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
        path: 'account',
        component: Account,
        title: 'Account',
      },
      {
        path: 'dashboard',
        component: Dashboard,
        title: 'Dashboard',
      },
    ],
  },
  {
    path: '',
    component: AuthLayout,
    children: [
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
    ],
  },
  { path: '**', component: NotFound },
];
