import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// CHARTIST
import { ChartistModule } from "ng-chartist";
// MODULES
import { ToolsModule } from 'src/app/tools.module';
// COMPONENTS
import { DashboardsComponent } from './dashboards.component';
import { ChartComponent } from './chart/chart.component';
import { MapComponent } from './map/map.component';
import { DxVectorMapModule } from 'devextreme-angular';

@NgModule({
    imports: [
        ToolsModule,
        RouterModule,
        ChartistModule,
        DxVectorMapModule
    ],
    declarations: [
        DashboardsComponent,
        ChartComponent,
        MapComponent,
    ]
})
export class DashboardsModule { }
