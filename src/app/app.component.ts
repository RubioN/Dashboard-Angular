import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    public isCel = true

    constructor(public location: Location) {
    }

    ngOnInit(){
    }

    isMap(path){
      var titlee = this.location.prepareExternalUrl(this.location.path())
      titlee = titlee.slice( 1 )
      if(path == titlee) {
        return false
      }
      else {
        return true
      }
    }
}
