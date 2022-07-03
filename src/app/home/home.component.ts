import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'agd-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    // TOPBAR DASHBOARDS BUTTON
    get dashboardsLink() {
        return {
            link: ['/home/dashboards'],
            disabled: false,
        }
    }

    get contactsLink() {
        return {
            link: ['/zdz'],
            disabled: false,
        }
    }    

    constructor() { }

    ngOnInit() {
    }

}
