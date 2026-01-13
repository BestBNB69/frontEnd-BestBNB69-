import { Routes } from '@angular/router';
import { Signin } from '../pages/signin/signin';
import { Signup } from '../pages/signup/signup';
import { Guestguard } from '../services/guestguard/guestguard';

const routes: Routes = [
    {
        path: 'login',
        component: Signin,
        canActivate: [Guestguard]
    },
    {
        path: 'register',
        component: Signup,
        canActivate: [Guestguard]
    }
];
export default routes;