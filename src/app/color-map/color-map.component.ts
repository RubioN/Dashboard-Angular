import { Component, Input, SimpleChanges } from '@angular/core';
import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';


export interface legendCountries {
    title: string
    count: number
    color: string
}
export class Country {
	totalArea: number
	color: string
}

export class Countries {
    [name: string]: Country
}

@Component({
    selector: 'app-color-map',
    templateUrl: './color-map.component.html',
    styleUrls: ['./color-map.component.scss']
})

export class ColorMapComponent {
  @Input()
  legendCountries: legendCountries[]

  @Input()
  mapData: any

  colorArr: any
  worldMap: any = mapsData.world
  countries: any

  constructor() {
      this.customizeTooltip = this.customizeTooltip.bind(this)
      this.customizeLayers = this.customizeLayers.bind(this)
      this.click = this.click.bind(this)
      this.colorArr = [ "#0d47a1", "#1565c0", "#1976d2", "#1e88e5", "#2196f3", "#42a5f5" ]
  }

  /*
  Param: changes: SimpleChanges
  Return: None
  Func: when receive new Data from firestore, colorize the right country
  */
  ngOnChanges(changes: SimpleChanges) {
      if (!changes.mapData.firstChange) {
          let map = Object.keys(changes.mapData.currentValue)
          var arrString = new Array<string>()
          for (let n = 0; n < map.length; n++) {
              arrString.push(map[n])
          }
          var tmp = new Array()
          var myCountry
          let colorIndex = 0
          for (let n = 0; n < map.length; n++) {
              myCountry = { name: map[n], totalArea: changes.mapData.currentValue[map[n]], color: "#128FDC" }
              tmp.push(myCountry)
          }
          tmp.sort(function(obj1, obj2) {
              return obj2.totalArea - obj1.totalArea
          });
          colorIndex = 0
          tmp.forEach((elem) => {
              elem.color = this.colorArr[colorIndex]
              if (colorIndex < 6)
                  colorIndex++
          });
          this.countries = {}
          let i = 0
          tmp.forEach((elem) => {
              let name = elem.name
              this.countries[name] = { totalArea: elem.totalArea, color: elem.color }
              i++;
          });
      }
  }

  /*
  Param: arg: Object
  Return: null / countryTooltip: Object
  Func: set the tooltip for the wanted country
  */
  customizeTooltip(arg) {
      if (this.countries) {
          let name = arg.attribute("name"),
          country = this.countries[name];
          if (country) {
              return {
                  text: name + ": " + country.totalArea + " Users",
                  color: "#1e88e5"
              };
          }
      }
      return null
  }

  /*
  Param: elements: Array
  Return: None
  Func: Set layers settings for the wanted country
  */
  customizeLayers(elements) {
      if (this.countries) {
          elements.forEach((element) => {
              let country = this.countries[element.attribute("name")]
              if (country) {
                  element.applySettings({
                      color: country.color,
                      hoveredColor: "#1e88e5",
                      selectedColor: "#1e88e5"
                  });
              };
          });
      }
  }

  /*
  Param: e: event
  Return: None
  Func: when a country is clicked, change it's color
  */
  click(e) {
      let target = e.target
      if (target && this.countries[target.attribute("name")]) {
          target.selected(!target.selected())
      }
  }
}
