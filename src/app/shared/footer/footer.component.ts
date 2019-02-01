import { Component } from '@angular/core';

declare var $:any;

@Component({
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html',
    styleUrls: ['./footer.component.css']
})

export class FooterComponent{
    test : Date = new Date()
}
