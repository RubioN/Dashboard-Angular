import { Component, OnInit } from '@angular/core';
// CHARTIST TYPES
import { IChartistData } from 'chartist';

@Component({
    selector: 'agd-dashboards',
    templateUrl: './dashboards.component.html',
    styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {

    // APPOINTMENTS DATA
    public aptData!: IChartistData;

    // STAFF VACATIONS DATA
    public staffVacationsData!: IChartistData;

    // RETURN OF INVESTMENT DATA
    public roiData!: IChartistData;

    constructor() { }

    ngOnInit() {
        // APPOINTMENTS DATA
        this.aptData = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            series: [
                [5, 4, 3, 7, 5, 10, 3],
                [3, 2, 9, 5, 4, 6, 4]
            ]
        };
        // STAFF VACATIONS DATA
        this.staffVacationsData = {
            labels: ['Presence', 'Out of office'],
            series: [
                [73],
                [27]
            ]
        };
        // RETURN OF INVESTMENT DATA
        this.roiData = {
            labels: ["January", "February", "March", "April", "May"],
            series: [
                [60, 57, 54, 40, 52],
                [93, 66, 89, 93, 93],
                [41, 39, 48, 57, 54]
            ]
        }
    }

}
