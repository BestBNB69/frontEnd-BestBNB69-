import { Routes } from '@angular/router';

const routes: Routes = [

    {
        path: 'listings',
        children: [
            //   { path: '', component: ListingsComponent },
            //   { path: ':id', component: ListingDetailComponent }
        ]
    },

    {
        path: 'bookings',
        // component: MyBookingsComponent
    },

    {
        path: 'messages',
        // component: ConversationsComponent
    },

    {
        path: 'host',
        // canActivate: [RoleGuard],
        data: { roles: ['HOST', 'CO_HOST'] },
        children: [
            //   { path: 'dashboard', component: HostDashboardComponent },
            //   { path: 'listings', component: HostListingsComponent },
            //   { path: 'bookings', component: HostBookingsComponent }
        ]
    }
];

export default routes;