import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// COMPONENTS
import { AuthenticationComponent } from './authentication.component';
import { SigninComponent } from './signin/signin.component';


const childRoutes: Routes = [
    {
        path: '',
        redirectTo: '/signin',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AuthenticationComponent,
        children: [
            {
                path: 'signin',
                component: SigninComponent,
            },
            // {
            //   path: 'signup',
            //   component: SignupComponent,
            // },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
