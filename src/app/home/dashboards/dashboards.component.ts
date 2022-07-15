import { Component, OnInit } from '@angular/core';
// CHARTIST TYPES
import { IChartistData } from 'chartist';
import { combineLatest, combineLatestAll, combineLatestWith, pipe } from 'rxjs';
import { DashboardsService } from './dashboards.service';

@Component({
    selector: 'agd-dashboards',
    templateUrl: './dashboards.component.html',
    styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {

    // APPOINTMENTS DATA
    public aptData!: IChartistData;

    // APPOINTMENTS LABELS
    public aptLabels!: String[];

    // STAFF VACATIONS DATA
    public staffVacationsData!: IChartistData;

    // RETURN OF INVESTMENT DATA
    public roiData!: IChartistData;

    // RETURN OF INVESTMENT LABELS
    public roiLabels!: String[];

    // LIST OF COUNTRIES WITH DATA
    public countries: any;

    // SHOW LOADER
    public loading = false;

    constructor(
        private dashboardService: DashboardsService,
    ) {
        // APPOINTMENTS DATA
        this.aptData = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            series: [],
        };
        // APT LABELS
        this.aptLabels = ["Intern", "Extern"];
        // STAFF VACATIONS DATA
        this.staffVacationsData = {
            labels: ['Presence', 'Out of office'],
            series: []
        };
        // RETURN OF INVESTMENT DATA
        this.roiData = {
            labels: ["January", "February", "March", "April", "May"],
            series: [
                [60, 57, 54, 40, 52],
                [93, 66, 89, 93, 93],
                [41, 39, 48, 57, 54]
            ]
        };
        // RETURN OF INVESTMENT LABELS
        this.roiLabels = ["Laptop", "Mobile", "Others"];
    }

    ngOnInit() {
        // SHOW LOADER
        this.loading = true;
        // TODO REMOVE COMBINE LATEST
        // COMBINE ALL API CALLS
        combineLatest([this.dashboardService.getStaff(), this.dashboardService.getUsersLocation(), this.dashboardService.getApts()]).subscribe({
            next: ([staff, locations, apts]) => {
                // UPDATE STAFF DATA
                this.staffVacationsData.series = staff;
                // UPDATE COUNTRIES DATA
                this.countries = locations;
                // ASSIGN COLORS
                Object.keys(this.countries).forEach(state => {
                    this.countries[state]['color'] = this.assignColorForUsers(this.countries[state]);
                });
                // UPDATE APTS DATA
                this.aptData.series = apts;
                // HIDE LOADER
                this.loading = false;
            },
            error: (err) => {
                // HIDE LOADER
                this.loading = false;
            }
        });
    }

    // ASSIGN THE COLOR FOR A GIVEN USERS NUMBERS
    assignColorForUsers(users: number) {
        if (users < 10) {
            return "#D1CBD0";
        }
        if (users < 50) {
            return "#BFB6BD";
        }
        if (users < 100) {
            return "#B6ABB4";
        }
        if (users < 250) {
            return "#ACA1AB";
        }
        if (users < 500) {
            return "#A396A1";
        }
        return "#9A8C98";
    }
}
