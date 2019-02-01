import { Component } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { UserService } from 'app/login/user.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  public db
  startDate: any
  endDate: any
  myDateArray: any

  constructor(private userService: UserService) {
    this.myDateArray = []
  }

  async ngOnInit() {
    this.startDate = this.defineDateLastMonthFr(1)
    this.endDate = this.defineDateLastMonthFr(2)
  }

  /*
  Unused
  Param: document: firestore
  Return: Date: array
  Func: Create the array of document's timestamp
  */
  async addDocumentName(myDoc) {
    var ret = new Array()
    await this.db.collection("brands").doc(myDoc.id).collection("data").get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        let date
        if (doc.data().timestamp) {
          date = new Date(doc.data().timestamp.seconds * 1000)
          date = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
          ret.push(date)
        }
      });
    });
    return (ret)
  }

  /*
  Unused
  Param: None
  Return: Date: array
  Func: Get all document's timestamp in Date Format
  */
  async getAllDocumentsId() {
		this.db.settings({
			timestampsInSnapshots: true
    });
    var ret
    return (ret)
  }

  /*
  Param: ind: number
  Return: date: Date
  Func: get the last month date (French Format JJ/MM/AAAA)
  */
  defineDateLastMonthFr(ind) {
    if (ind == 1) {
      var dateStart = Date.now()
      dateStart = Math.round(dateStart) + 1
      var start = new Date(dateStart)
      if (start.getMonth() == 1)
        return (new Date(start.getFullYear(), 12, start.getDate()))
      else
        return (new Date(start.getFullYear(), start.getMonth() - 1, start.getDate()))
    }
    else {
      var dateEnd = Date.now()
      dateEnd = Math.round(dateEnd) + 1
      var end = new Date(dateEnd)
      return (new Date(end.getFullYear(), end.getMonth(), end.getDate()))
    }
  }

  /*
  Param: ind: number
  Return: date: Date
  Func: get the last month date (US Format MM/DD/YYYY)
  */
  defineDateLastMonth(ind) {
    if (ind == 1) {
      var dateStart = Date.now()
      dateStart = Math.round(dateStart) + 1
      var start = new Date(dateStart)
      if (start.getMonth() == 1)
        return (new Date(start.getFullYear(), 12, start.getDate()))
      else
        return (new Date(start.getFullYear(), start.getMonth() - 1, start.getDate()))
    }
    else {
      var dateEnd = Date.now()
      dateEnd = Math.round(dateEnd) + 1
      var end = new Date(dateEnd)
      return (new Date(end.getFullYear(), end.getMonth(), end.getDate()))
    }
  }

  /*
  Param: event: MatDatepickerInputEvent<Date>
  Return: None
  Func: set startDate to the new calendar choice
  */
  addFrom(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value
  }

  /*
  Param: event: MatDatepickerInputEvent<Date>
  Return: None
  Func: set endDate to the new calendar choice
  */
  addTo(event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value
  }

  /*
  Param: None
  Return: this.startDate: Date
  Func: return this.startDate value
  */
  getStartDate()
  {
    return this.startDate
  }

  /*
  Param: None
  Return: this.endDate: Date
  Func: return this.endDate value
  */
  getEndDate()
  {
    return this.endDate
  }

  /*
  Unused
  Param: date: Date
  Return: number
  Func: filter if we want to disabled the day that hasn't firestore document
  */
  dateFilter = (date: Date) => { // Month begin at 0, need to make a +1
    var allDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
    for (var x = 0; x < this.myDateArray.length; x++) {
      if (allDate == this.myDateArray[x]) {
        return (1)
      }
    }
    return (0)
  }

  /*
  Param: date: Date
  Return: always 1
  Func: doesn't disabled any date in calendar
  */
  noDateFilter = (date: Date) => {
    return (1)
  }
}
