import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// COMPONENTS
import { HomeComponent } from './home.component';
import { DashboardsComponent } from './dashboards/dashboards.component';

const childRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboards',
                pathMatch: 'full',
            },
            {
                path: 'dashboards',
                component: DashboardsComponent
            },
            // {
            //     path: 'dashboards',
            //     loadChildren: () => import('./dashboards/dashboards.module').then(module => module.DashboardsModule),
            // },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }
