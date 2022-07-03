import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// MODULES
import { ToolsModule } from 'src/app/tools.module';
// COMPONENTS
import { DashboardsComponent } from './dashboards.component';

@NgModule({
    imports: [
        ToolsModule,
        RouterModule,
    ],
    declarations: [
        DashboardsComponent
    ]
})
export class DashboardsModule { }
