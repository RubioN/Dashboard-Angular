import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { UsesComponent } from '../../uses/uses.component';

/*
Link beetween the path and the component
*/
export const AdminLayoutRoutes: Routes = [
    { path: 'summary',    component: HomeComponent },
    { path: 'customers',  component: UserComponent },
    { path: 'uses',       component: UsesComponent },
];
