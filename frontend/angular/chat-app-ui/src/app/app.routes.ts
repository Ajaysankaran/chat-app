import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'chat-home',
        loadComponent: () => import('./pages/chat-home/chat-home.component').then(m => m.ChatHomeComponent)
    },
];
