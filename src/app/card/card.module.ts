import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardComponent } from './card-comp/card.component';
import { BubbleMapComponent } from '../bubble-map/bubble-map.component';
import { ColorMapComponent } from '../color-map/color-map.component';
// import { DxVectorMapModule } from 'devextreme-angular';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LbdChartComponent } from '../lbd/lbd-chart/lbd-chart.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // DxVectorMapModule,
    MatSlideToggleModule
  ],
  declarations: [
    CardComponent,
    BubbleMapComponent,
    LbdChartComponent,
    ColorMapComponent
  ],
  exports: [
    // CardComponent,
    // BubbleMapComponent,
    // LbdChartComponent,
    // ColorMapComponent
  ]
})
export class CardModule { }