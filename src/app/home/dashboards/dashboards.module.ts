import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// CHARTIST
import { ChartistModule } from "ng-chartist";
// MODULES
import { ToolsModule } from 'src/app/tools.module';
// COMPONENTS
import { DashboardsComponent } from './dashboards.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
    imports: [
        ToolsModule,
        RouterModule,
        ChartistModule
    ],
    declarations: [
        DashboardsComponent,
        ChartComponent,
    ]
})
export class DashboardsModule { }
