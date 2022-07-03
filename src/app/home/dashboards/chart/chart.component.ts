import { Component, Input, OnInit } from '@angular/core';
// CHARTIST
import { IBarChartOptions, IChartistAnimationOptions, IChartistData, ILineChartOptions, IPieChartOptions } from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

@Component({
    selector: 'agd-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

    @Input() public type!: ChartType;

    @Input() public data!: IChartistData;

    public options!: IBarChartOptions | ILineChartOptions | IPieChartOptions;

    public events: ChartEvent = {
        draw: (data) => {
            if (data?.type === 'bar') {
                data?.element.animate({
                    y2: <IChartistAnimationOptions>{
                        dur: '0.5s',
                        from: data?.y1,
                        to: data?.y2,
                        easing: 'easeOutQuad'
                    }
                });
            }
        }
    };

    constructor() {}

    ngOnInit(): void {
        switch (this.type) {
            case 'Bar':
                this.options = {
                    axisX: { showGrid: false, showLabel: true, },
                    axisY: { showLabel: true },
                    height: 300,            
                }
                break;
            case 'Pie':
                this.options = {
                    height: 300,
                    donut: true,
                    donutWidth: 60,
                    showLabel: false,
                    startAngle: 270,
                    total: 100,                    
                }
                break;
            case 'Line':
                this.options = {
                    height: 300,
                }
                break;    
            default:
                break;
        }
    }
}
