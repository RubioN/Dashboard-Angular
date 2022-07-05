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

    // LIST OF COUNTRIES WITH DATA
    public countries: any;

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
        this.countries = {
            Russia: { customers: 49 },
            Canada: { customers: 280 },
            China: { customers: 9 },
            'United States': { customers: 450 },
            France: { customers: 749 },
            Spain: { customers: 117 },
        };
        // ASSIGN COLORS
        Object.keys(this.countries).forEach(state => {
            this.countries[state].color = this.assignColorForCustomers(this.countries[state].customers);
        });
    }

    // ASSIGN THE COLOR FOR A GIVEN CUSTOMERS NUMBERS
    assignColorForCustomers(customers: number) {
        if (customers < 10) {
            return "#D1CBD0";
        }
        if (customers < 50) {
            return "#BFB6BD";
        }
        if (customers < 100) {
            return "#B6ABB4";
        }
        if (customers < 250) {
            return "#ACA1AB";
        }
        if (customers < 500) {
            return "#A396A1";
        }
        return "#9A8C98";
    }
}
