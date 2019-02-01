import { Injectable, ViewChild, Input, Component } from '@angular/core';
import { CalendarComponent } from 'app/calendar/calendar.component';
import { UserService } from 'app/login/user.service';

@Injectable({
	providedIn: 'root',
})

export class DataService {

	public db
	public nbDocMale = 0
	public nbDocFemale = 0
	public docEmpty = 0
	@Input() CalendarComponent: CalendarComponent
	public lang = navigator.language

	constructor() {
		if (this.lang.indexOf("fr") == -1 && this.lang.indexOf("FR") == -1) {
			this.lang = "en-US"
		}
  }
}
