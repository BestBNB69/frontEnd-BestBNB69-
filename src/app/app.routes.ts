import { Routes } from '@angular/router';
import { Authguard } from './services/authguard/authguard';
import { Roleguard } from './services/roleguard/roleguard';
import { Signin } from './pages/signin/signin';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },

    {
        path: 'auth',
        loadChildren: () =>
            import('./routes/auth.routes').then(m => m.default)
    },

    {
        path: 'listings',
        canActivate: [Authguard],
        component: Signin // 🔧 TEMPORAIRE (à remplacer)
    },

    {
        path: 'messages',
        canActivate: [Authguard],
        component: Signin // 🔧 TEMPORAIRE
    },

    {
        path: 'host',
        canActivate: [Roleguard],
        data: { roles: ['HOST', 'CO_HOST'] },
        component: Signin // 🔧 TEMPORAIRE
    }
];
