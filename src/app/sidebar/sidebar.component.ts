import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { logoExport } from '../shared/navbar/navbar.component';
import { CalendarComponent } from 'app/calendar/calendar.component';
import { AppComponent } from 'app/app.component';

declare const $: any
declare interface RouteInfo {
    path: string
    title: string
    icon: string
    class: string
}
export const ROUTES: RouteInfo[] = [
    { path: '/summary', title: 'summary', icon: 'pe-7s-graph', class: '' },
    { path: '/customers', title: 'customers', icon: 'pe-7s-user', class: '' },
    { path: '/uses', title: 'uses', icon: 'pe-7s-note2', class: '' },
];

@Component({
    providers:[CalendarComponent, AppComponent],
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    menuItems: any[]
    public urlLogo: string
    @Input() CalendarComponent: CalendarComponent
    @ViewChild(CalendarComponent) calendar
    public lang = navigator.language

    constructor(private router: Router) {
        if (this.lang.indexOf("fr") == -1 && this.lang.indexOf("FR") == -1) {
			this.lang = "en-US"
		}
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem)
        this.urlLogo = logoExport
    }
    
    /*
    Param: None
    Return: bool
    Func: Check the window's size
    */
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false
        }
        return true
    };

    /*
    Param: None
    Return: None
    Func: Reload the current page after "Proceed"
    */    
    trigger() {
        if (this.router.url == "/summary") {
            this.router.navigate(["/uses"], {skipLocationChange: true}).then(()=>
            this.router.navigate(["/summary"]))
        }
        else if (this.router.url == "/customers") {
            this.router.navigate(["/summary"], {skipLocationChange: true}).then(()=>
            this.router.navigate(['/customers']))
        }
        if (this.router.url == "/uses") {
            this.router.navigate(["/summary"], {skipLocationChange: true}).then(()=>
            this.router.navigate(['/uses']))
        }
    }

    /*
    Param: Calendar (dates): array
    Return: new date format (FR): array
    Func: Change the date format (US -> FR)
    */
    calendarFr(dateFr) {
        var arrStartDate = dateFr.split('/')
        dateFr = arrStartDate[1] + "/" + arrStartDate[0] + "/" + arrStartDate[2]
        return dateFr
    }

    /*
    Param: None
    Return: None
    Func: "Proceed" button onclick - Change the period of all charts
    */
    proceed() {
        var startDate = (document.querySelector("#mat-input-calendar-1") as HTMLInputElement).value
        var endDate = (document.querySelector("#mat-input-calendar-2") as HTMLInputElement).value
        if (this.lang == "fr-FR" || this.lang == "fr" || this.lang.indexOf("fr") != -1  || this.lang.indexOf("FR") != -1) {
            startDate = this.calendarFr(startDate)
            endDate = this.calendarFr(endDate)
        }
        var timestampStartDate = new Date(startDate).getTime()
        var timestampEndDate = new Date(endDate).getTime()
        if (timestampStartDate > timestampEndDate) {
            var tmp = timestampEndDate
            timestampEndDate = timestampStartDate
            timestampStartDate = tmp
            var tmpDate = this.calendar.endDate
            this.calendar.endDate = this.calendar.startDate
            this.calendar.startDate = tmpDate
        }
        this.trigger()
    }
}
