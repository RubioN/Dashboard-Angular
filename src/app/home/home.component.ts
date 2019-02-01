import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import { CardType, MapType } from '../card/card-comp/card.component';
import * as Chartist from 'chartist';
import { legendCountries } from 'app/color-map/color-map.component';
import { DataService } from 'app/services/data.service';
import { AppComponent } from 'app/app.component'
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	@Input()
  public screenWidth = window.screen.width

	public simple: CardType
	public chart: CardType
	public map: CardType

	public bubble: MapType
	public color: MapType

	public activityTypesChartType = ChartType.Pie
	public activityTypesChartData = {labels: [ "0%" ], series: [ 0 ]}
  public activityTypesChartOptions = { labelOffset: 30 }
	public activityTypesChartLegendItems: LegendItem[]

	public userGenderChartType = ChartType.Pie
	public userGenderChartData = {labels: [ "0%" ], series: [ 0 ]}
	public userGenderChartLegendItems: LegendItem[]

	public donutChartOptions = {
		donut: true,
		donutWidth: 40
	};

	public sessionsChartType = ChartType.Line
	public sessionsChartData = {labels: [ "0%" ], series: [[ 0 ]]}
	public sessionsChartOptions: any
	public sessionsChartResponsive: any[]
	public sessionsChartLegendItems: LegendItem[]

	public userAgeChartType = ChartType.Bar
	public userAgeChartData = {labels: [ "0%" ], series: [[ 0 ]]}
	public userAgeChartOptions: any
	public userAgeChartResponsive: any[]
	public userAgeChartLegendItems: LegendItem[]

	public mapData: any
	public legendCountries: legendCountries[]

	public nbUsers: any
	public averageAct: any
	public nbHeatWaves: any
	public nbCountries: any
	public averageOutsideTemp: any
	public averageBodyTemp: any
	public averageHeatDuration: any
	public averageHeatWaves: any

	public HomeData: any
	public myActivityTypes: any

	constructor(private appComponent: AppComponent, private dataService: DataService, private router: Router, private location:Location) {
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
  Func: Create a chart (activity types)
  */
	getActivityData() {
		this.myActivityTypes = this.HomeData.activities.totalActivityTypes
		this.activityTypesChartType = ChartType.Pie
	  var series = this.myActivityTypes
		this.activityTypesChartData = {
			labels: this.getLabels(series),
			series: series
		};
		this.activityTypesChartLegendItems = [
			{ title: 'Apple', imageClass: 'fa fa-circle text-outdoor' },
			{ title: 'Facebook', imageClass: 'fa fa-circle text-cycle' },
			{ title: 'Samsung', imageClass: 'fa fa-circle text-Samsung'},
			{ title: 'One+', imageClass: 'fa fa-circle text-skiing' },
			{ title: 'Toshiba', imageClass: 'fa fa-circle text-fishing' },
			{ title: 'Microsoft', imageClass: 'fa fa-circle text-hunting' },
			// { title: 'Tesla', imageClass: 'fa fa-circle text-Tesla' },
			{ title: 'Huawei', imageClass: 'fa fa-circle text-others' }
    ];
	}

	/*
  Param: None
  Return: None
  Func: Create a map (location)
  */ 
	getMapData() {
		this.mapData = this.HomeData.map.data;
		let legendMap = Object.keys(this.HomeData.map.data)
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
  Func: Create simple charts
  */
	getSimple()	{
		this.nbUsers = 78
		this.averageAct = "32 min(s)"
    this.nbHeatWaves = 78
		this.nbCountries = Object.keys(this.HomeData.map.data).length

		this.averageOutsideTemp = (67 * 100) / 100
		this.averageBodyTemp = (98 * 100) / 100
		
		// Fahrenheit wanted
		if (this.appComponent.isCel == false) {
			this.averageOutsideTemp =  "32 °F"
			this.averageBodyTemp = "34 °F"
		}
		else {
			this.averageOutsideTemp = "40 °C"
			this.averageBodyTemp = "49 °C"
		}
		this.averageHeatDuration = "54 min(s)"
		this.averageHeatWaves = 67
	}

	/*
  Param: None
  Return: None
  Func: Create a chart (User Profile by gender)
  */
	getUserGenderData()	{
		this.userGenderChartType = ChartType.Pie
    	let serie = [ this.HomeData.userInfos.gender.male[1], this.HomeData.userInfos.gender.female[1] ]
		this.userGenderChartData = {
			labels: this.getLabels(serie),
			series: serie
		};
		this.userGenderChartLegendItems = [
			{ title: 'Men', imageClass: 'fa fa-circle text-men' },
			{ title: 'Women', imageClass: 'fa fa-circle text-women' }
		];
	}

	/*
  Param: None
  Return: None
  Func: Create a chart (n° sessions)
  */
	getSessionsData()	{
    this.sessionsChartType = ChartType.Line
		this.sessionsChartData = {
			labels: this.HomeData.nbSessions.labels,
			series: [
				this.HomeData.nbSessions.series
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

	 max_m = Math.max.apply(Math, this.HomeData.userInfos.ageRange.male)
	 max_f = Math.max.apply(Math, this.HomeData.userInfos.ageRange.female)
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
  Func: Create a chart (User Profile by Age group)
  */
	getUserAgeData() {
    this.userAgeChartType = ChartType.Bar
    let male = this.HomeData.userInfos.ageRange.male
    let female = this.HomeData.userInfos.ageRange.female
		this.userAgeChartData = {
			labels: ['18-25', '26-34', '35-46', '47-55', '56-65', '66+'],
			series: [
          female,
          male
			]
		};
    let max = this.getMaxValue()
    this.userAgeChartOptions = {
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
  Param: None
  Return: None
  Func: Set default data (all charts)
  */
	setStaticData()	{
		this.sessionsChartOptions = {
			fullWidth: true,
			chartPadding: {
				right: 40
			}
		};
		this.sessionsChartResponsive = [
			['screen and (max-width: 640px)', {
				axisX: {
					labelInterpolationFnc: function (value) {
						return value[0];
					}
				}
			}]
		];
		this.sessionsChartLegendItems = [
			{ title: 'Sessions', imageClass: 'fa fa-circle text-men' },
		];
		this.userAgeChartOptions = {
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
		this.userAgeChartResponsive = [
			['screen and (max-width: 640px)', {
				seriesBarDistance: 5,
				axisX: {
					labelInterpolationFnc: function (value) {
						return value[0]
          }
        }
			}]
		];
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