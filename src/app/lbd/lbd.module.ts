
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'app/material.module'
import { LbdChartComponent } from './lbd-chart/lbd-chart.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  declarations: [
    LbdChartComponent
  ],
  exports: [
    LbdChartComponent
  ]
})
export class LbdModule { }
