import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
// WORLD MAP DATA
// @ts-ignore
import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';

@Component({
  selector: 'agd-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {

  // DATA OF THE WORLD MAP
  public worldMap: any = mapsData.world;

  // LIST OF COUNTRIES TO DISPLAY IN COLORS
  @Input() countries: any;

  constructor(private cd: ChangeDetectorRef) {
    this.customizeTooltip = this.customizeTooltip.bind(this);
    this.customizeLayers = this.customizeLayers.bind(this);
  }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['countries']) {
      this.customizeTooltip = this.customizeTooltip.bind(this);
      this.customizeLayers = this.customizeLayers.bind(this);
      this.cd.detectChanges();
    }
  }

  customizeTooltip(arg: any) {
    const name = arg.attribute('name');
    if (this.countries) {
      const country = this.countries[name];
      if (country) {
        return {
          text: `${name}: ${country.users} customers`,
          color: 'var(--agd-tertiary)',
        };
      } 
    }
    return null;
  }

  customizeLayers(elements: any) {
    elements.forEach((element: any) => {
      if (this.countries) {
        const country = this.countries[element.attribute('name')];
        if (country) {
          element.applySettings({
            color: country.color,
            hoveredColor: 'var(--agd-tertiary)',
            selectedColor: 'var(--agd-tertiary)',
          });
        }
      }
    });
  }
}
