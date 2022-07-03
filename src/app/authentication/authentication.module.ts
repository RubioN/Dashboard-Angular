import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// MODULES
import { ToolsModule } from '../tools.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
// COMPONENTS
import { SigninComponent } from './signin/signin.component';

@NgModule({
    imports: [
        RouterModule,
        ToolsModule,
        AuthenticationRoutingModule,
    ],
    declarations: [
        AuthenticationComponent,
        SigninComponent,
    ]
})
export class AuthenticationModule { }
