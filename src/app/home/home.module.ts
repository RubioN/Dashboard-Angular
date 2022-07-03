import { NgModule } from '@angular/core';
import { ToolsModule } from '../tools.module';
import { RouterModule } from '@angular/router';
// MODULES
import { HomeRoutingModule } from './home-routing.module';
import { DashboardsModule } from './dashboards/dashboards.module';
// COMPONENTS
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        ToolsModule,
        RouterModule,
        HomeRoutingModule,
        DashboardsModule,
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule { }
