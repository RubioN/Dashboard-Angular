import { Component, OnInit, Input } from '@angular/core';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import { CardType, MapType } from '../card/card-comp/card.component';
import { legendCountries } from 'app/color-map/color-map.component';
import { DataService } from '../services/data.service'
import * as Chartist from 'chartist';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-uses',
  templateUrl: './uses.component.html',
  styleUrls: ['./uses.component.css']
})
export class UsesComponent implements OnInit {

  public simple: CardType
  public chart: CardType
  public map: CardType

  public bubble: MapType
  public color: MapType
  public legendCountries: legendCountries[]

  public manActChartType: ChartType
  public manActChartData: any
  public manActChartLegendItems: LegendItem[]
  public manActChartOptions: any

  public womanActChartType: ChartType
  public womanActChartData: any
  public womanActChartLegendItems: LegendItem[]
  public womanActChartOptions: any

  public averageChartType: ChartType
  public averageChartData: any
  public averageChartOptions: any
  public averageChartResponsive: any[]
  public averageChartLegendItems: LegendItem[]

  public engagementChartType: ChartType
  public engagementChartData: any
  public engagementChartOptions: any
  public engagementChartResponsive: any[]
  public engagementChartLegendItems: LegendItem[]

  public thermalChartType: ChartType
  public thermalChartData: any
  public thermalChartOptions: any
  public thermalChartResponsive: any[]
  public thermalChartLegendItems: LegendItem[]

  public mapData: any

  public selectedToggle: any = "°C"

  @Input()
  labelDegree: any

  public nbSessions: any
  public averageTimeSession: any
  public mainActivity: any
  public UsesData: any

	constructor(private dataService: DataService, private router: Router, private location:Location, private appComponent:AppComponent) {
  }
  
  /*
  Param: Fahrenheit or Celsius : array
  Return: None
  Func: Change the label's content (OutsideTemperature)
  */
  updateLabelDegree(array) {
    this.labelDegree = array
    this.getThermal()
  }

  /*
  Param: None
  Return: None
  Func: Set default data (all charts)
  */
  setStaticData() {
    this.averageChartType = ChartType.Bar
    this.womanActChartType = ChartType.Pie
    this.manActChartType = ChartType.Pie
    this.engagementChartType = ChartType.Line
    this.thermalChartType = ChartType.Bar

    if (this.appComponent.isCel)
      this.labelDegree = ['20°C-25°C', '15°C-20°C', '10°C-15°C', '5°C-10°C', '0°C-5°C', '-5°C-0°C', 'below -5°C']
    else
      this.labelDegree = ['68°F-77°F', '59°F-68°F', '50°F-59°F', '41°F-50°F', '32°F-41°F', '23°F-32°F', 'below 23°F']
    this.engagementChartData = {
      labels: ['engagement'],
      series: [[0]]
    };
    this.manActChartLegendItems = [
			{ title: 'Apple', imageClass: 'fa fa-circle text-outdoor' },
			{ title: 'Facebook', imageClass: 'fa fa-circle text-cycle' },
			{ title: 'Samsung', imageClass: 'fa fa-circle text-Samsung'},
			{ title: 'One+', imageClass: 'fa fa-circle text-skiing' },
			{ title: 'Toshiba', imageClass: 'fa fa-circle text-fishing' },
			{ title: 'Microsoft', imageClass: 'fa fa-circle text-hunting' },
			// { title: 'Tesla', imageClass: 'fa fa-circle text-Tesla' },
			{ title: 'Huawei', imageClass: 'fa fa-circle text-others' }
    ];
    this.manActChartOptions = {
      labelOffset: 30
    };
    this.womanActChartLegendItems = [
			{ title: 'Apple', imageClass: 'fa fa-circle text-outdoor' },
			{ title: 'Facebook', imageClass: 'fa fa-circle text-cycle' },
			{ title: 'Samsung', imageClass: 'fa fa-circle text-Samsung'},
			{ title: 'One+', imageClass: 'fa fa-circle text-skiing' },
			{ title: 'Toshiba', imageClass: 'fa fa-circle text-fishing' },
			{ title: 'Microsoft', imageClass: 'fa fa-circle text-hunting' },
			// { title: 'Tesla', imageClass: 'fa fa-circle text-Tesla' },
			{ title: 'Huawei', imageClass: 'fa fa-circle text-others' }
    ];
    this.womanActChartOptions = {
      labelOffset: 30
    };
    this.averageChartOptions = {
      seriesBarDistance: 10,
      reverseData: true,
      horizontalBars: true,
      axisY: {
        offset: 70
      }
    };
    this.averageChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0]
          }
        }
      }]
    ];
    this.averageChartLegendItems = [
      { title: 'Men', imageClass: 'fa fa-circle text-men' },
      { title: 'Women', imageClass: 'fa fa-circle text-women' }
    ];
    this.engagementChartOptions = {
      fullWidth: true,
      chartPadding: {
        right: 40
      }
    }
    this.engagementChartLegendItems = [
			{ title: 'Apple', imageClass: 'fa fa-circle text-outdoor' },
			{ title: 'Facebook', imageClass: 'fa fa-circle text-cycle' },
			{ title: 'Samsung', imageClass: 'fa fa-circle text-Samsung'},
			{ title: 'One+', imageClass: 'fa fa-circle text-skiing' },
			{ title: 'Toshiba', imageClass: 'fa fa-circle text-fishing' },
			{ title: 'Microsoft', imageClass: 'fa fa-circle text-hunting' },
			// { title: 'Tesla', imageClass: 'fa fa-circle text-Tesla' },
			{ title: 'Huawei', imageClass: 'fa fa-circle text-others' }
    ];
    this.thermalChartOptions = {
      seriesBarDistance: 10,
      reverseData: true,
      horizontalBars: true,
      high: 105,
			axisX: {
				type: Chartist.FixedScaleAxis,
				ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
			      },
      axisY: {
        offset: 70
      }
    };
    this.thermalChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0]
          }
        }
      }]
    ];
    this.thermalChartLegendItems = [
      { title: 'Men', imageClass: 'fa fa-circle text-men' },
      { title: 'Women', imageClass: 'fa fa-circle text-women' }
    ];
  }

  /*
  Param: series (chart) : JSON Object
  Return: Labels (for all charts) : array
  Func: Change the label's content (OutsideTemperature)
  */
  getLabels(series)	{
		let arr = []
		let i = 0

		while (series && i < Object.keys(series).length) {
      if (series[i] != 0)
        arr[i] = series[i] + "%"
      else
        arr[i] = ' '
			i++
    }
		return arr
	}

  /*
  Param: None
  Return: None
  Func: Create a map (location)
  */  
  getMapData() {
    this.mapData = this.UsesData.map.data;
		let legendMap = Object.keys(this.UsesData.map.data)
		var res = new Array()
		var myCountry
		for (let n = 0; n < legendMap.length; n++) {
			myCountry = { title: legendMap[n], count: this.mapData[legendMap[n]], color: 'fa fa-circle text-info' }
      myCountry.title = myCountry.title.replace(" ", "-")
      res.push(myCountry)
		}
		res.sort(function(obj1, obj2) {
			return obj2.count - obj1.count
		});
		res = res.slice(0,6)
		this.legendCountries = res
  }

  /*
  Param: None
  Return: None
  Func: Create a chart (Activity Types Men)
  */
  getMenAct() {
    this.manActChartData = {
      labels: this.getLabels(this.UsesData.activities.genderActivities.male),
			series: this.UsesData.activities.genderActivities.male
    };
  }


  /*
  Param: None
  Return: None
  Func: Create a chart (Activity Types Women)
  */
  getWomenAct() {
    this.womanActChartData = {
      labels: this.getLabels(this.UsesData.activities.genderActivities.female),
			series: this.UsesData.activities.genderActivities.female
    };
  }


  /*
  Param: None
  Return: None
  Func: Create a chart (Average Activity Duration)
  */
  getAverage() {
    this.averageChartData = {
      labels: ['Apple', 'Facebook', 'Samsung', 'One+', 'Toshiba', 'Microsoft', 'Huawei', 'Others' ],
      series: [
        this.UsesData.activityDuration.genderActivityDur.female,
        this.UsesData.activityDuration.genderActivityDur.male
      ]
    };
  }

  /*
  Param: None
  Return: max: number
  Func: return the max value of an array
  */
  getMaxValue()
  {
    let max_m
    let max_f

    max_m = Math.max.apply(Math, this.UsesData.outsideTemperature.genderOutsideTemp.male)
    max_f = Math.max.apply(Math, this.UsesData.outsideTemperature.genderOutsideTemp.female)
    if (!max_m)
      max_m = 0
    if (!max_f)
      max_f = 0
    if (max_m > max_f)
      return max_m
    return max_f
  }

  /*
  Param: None
  Return: None
  Func: Create a chart (Outside temperature)
  */
  getThermal() {
    if (this.appComponent.isCel)
      this.labelDegree = ['20°C-25°C', '15°C-20°C', '10°C-15°C', '5°C-10°C', '0°C-5°C', '-5°C-0°C', 'below -5°C']
    else
      this.labelDegree = ['68°F-77°F', '59°F-68°F', '50°F-59°F', '41°F-50°F', '32°F-41°F', '23°F-32°F', 'below 23°F']
    this.thermalChartData = {
      labels: this.labelDegree,
      series: [
        this.UsesData.outsideTemperature.genderOutsideTemp.female,
        this.UsesData.outsideTemperature.genderOutsideTemp.male
      ]
    };
    let max = this.getMaxValue()
    this.thermalChartOptions = {
      seriesBarDistance: 10,
      reverseData: true,
      horizontalBars: true,
      high: max + 5,
			axisX: {
				type: Chartist.FixedScaleAxis,
				ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
			      },
      axisY: {
        offset: 70
      }
    };
  }


  /*
  Param: series: array
  Return: labels: array
  Func: Init labels (Engagement by Activity Y axis)
  */
  createEngagementSeries(series) {
    var ret : number[][] = new Array()
    var max = 0
    var i = 0
    let n = 0

    while (series[n][max]) {
      ret[max] = new Array()
      max++
    }
    while (i < max) {
      n = 0
      while (series && series[n]) {
        ret[i][n] = series[n][i]
        n++
      }
      i++
    }
    return ret
  }


  /*
  Param: None
  Return: None
  Func: Create a chart (Engagement by Activity)
  */
  getEngagement() {
    let series = this.createEngagementSeries(this.UsesData.engagementByActivity.series)
    this.engagementChartData = {
	    labels: this.UsesData.engagementByActivity.labels,
	    series: series
    };
  }


  /*
  Param: None
  Return: None
  Func: Create 3 simple cards (Number of Sessions, Average Time by Session, Main Activity)
  */
  getSimple() {
    this.nbSessions = 89
    this.averageTimeSession = "34 min"

    var res = 0
    var n = 0
    let i = 0
    this.UsesData.activities.totalActivityTypes.forEach(element => {
      if (element > res) {
        res = element
        n = i
      }
      i++
    });
    var labels =  ['Apple', 'Facebook', 'Samsung', 'One+', 'Toshiba', 'Microsoft', 'Huawei', 'Others']
    this.mainActivity = labels[n]
  }


  ngOnInit() {
    this.simple = CardType.simple
    this.chart = CardType.chart
    this.map = CardType.map
    this.bubble = MapType.bubble
    this.color = MapType.color
    this.setStaticData()
  }
}
