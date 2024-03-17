import { Routes } from '@angular/router';
import { ChatHomeComponent } from './pages/chat-home/chat-home.component';
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
        component: ChatHomeComponent
    },
];
