import { Component } from '@angular/core';
import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
import { FeatureCollection, Service } from '../app.service';

@Component({
    selector: 'app-map',
    providers: [ Service ],
    templateUrl: 'bubble-map.component.html',
    styleUrls: ['bubble-map.component.scss']
})

export class BubbleMapComponent {
    worldMap: any = mapsData.world
    markers: FeatureCollection

    constructor(service: Service) {
        this.markers = service.getMarkers()
    }

    customizeText(arg) {
        return ["< 8000K", "8000K to 10000K", "> 10000K"][arg.index]
    }

    customizeTooltip(arg) {
        if (arg.layer.type === "marker") {
            return {
                text: arg.attribute("tooltip")
            };
        }
    }
}