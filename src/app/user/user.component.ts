import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router'
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import { CardType } from '../card/card-comp/card.component';
import * as Chartist from 'chartist';
import { DataService } from '../services/data.service'

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public simple: CardType
  public chart: CardType

  public DeviceChartType: ChartType
  public DeviceChartData: any
  public DeviceChartLegendItems: LegendItem[]

  public usersChartType: ChartType
  public usersChartData: any
  public usersChartOptions: any
  public usersChartResponsive: any[]
  public usersChartLegendItems: LegendItem[]

  public donutChartOptions: any

  public EngagementChartType: ChartType
  public EngagementChartData: any
  public EngagementChartOptions: any
  public EngagementChartResponsive: any[]
  public EngagementChartLegendItems: LegendItem[]

  public ExpertiseChartType: ChartType
  public ExpertiseChartData: any
  public ExpertiseChartOptions: any
  public ExpertiseChartResponsive: any[]
  public ExpertiseChartLegendItems: LegendItem[]

  public TrackerChartType: ChartType
  public TrackerChartData: any
  public TrackerChartOptions: any
  public TrackerChartResponsive: any[]
  public TrackerChartLegendItems: LegendItem[]

  public WearChartType: ChartType
  public WearChartData: any
  public WearChartOptions: any
  public WearChartResponsive: any[]
  public WearChartLegendItems: LegendItem[]

  public productChartType: ChartType
  public productChartData: any
  public productChartOptions: any
  public productChartResponsive: any[]
  public productChartLegendItems: LegendItem[]

  public interestChartType: ChartType
  public interestChartData: any
  public interestChartOptions: any
  public interestChartResponsive: any[]
  public interestChartLegendItems: LegendItem[]

  public nbUsers: any
  public nbNewUsers: any
  public nbSessions: any
  public UserData: any

	constructor() {
	}

  /*
  Param: None
  Return: None
  Func: Create a chart (User Engagement)
  */ 
  getEngagementData() {
    // Prep: v2
    // this.EngagementChartData = {
    //   labels: ['Users'],
    //   series: [
    //     [this.UserData.User_engagement.men],
    //     [this.UserData.User_engagement.women]
    //   ]
    // };
  }

  /*
  Param: None
  Return: None
  Func: Create a chart (User Expertise)
  */
  getExpertiseData() {
    // Prep: v2
    // this.ExpertiseChartData = {
    //   labels: ['Users'],
    //   series: [
    //     [this.UserData.User_expertise.men],
    //     [this.UserData.User_expertise.women],
    //   ]
    // };
  }

  /*
  Param: None
  Return: None
  Func: Create a chart (Device)
  */  
  getDeviceData() {
    this.DeviceChartData = {
      labels: ["64%", "36%"],
      series: [62, 22]
    };
  }

  /*
  Param: None
  Return: None
  Func: Create a chart (Model)
  */  
  getWearData() {
    this.WearChartData = {
      labels: ['Model 1', 'Model 2', 'Model 3'],
      series: [
        [240, 180, 0],
        [542, 260, 320],
        [0, 243, 140]
      ]
    };
    this.WearChartLegendItems = [
      { title: 'Blue', imageClass: 'fa fa-circle text-outdoor' },
      { title: 'Red', imageClass: 'fa fa-circle text-cycle' },
      { title: 'Black', imageClass: 'fa fa-circle text-black' },
      { title: 'Green', imageClass: 'fa fa-circle text-fishing' }
    ];
  }

  /*
  Param: None
  Return: None
  Func: Create a chart (User Interest)
  */  
  getInterestData() {
    this.interestChartData = {
      labels: ['Medias/News', 'Sports', 'Music', 'Dance'],
      series: [
        [20, 35, 15, 30]
      ]
    };
  }

  /*
  Param: None
  Return: None
  Func: Create a chart (Product)
  */  
  getProductData() {
    this.productChartData = {
      labels: ['Base layer', 'Mid layer', 'Jacket', 'Down jacket'],
      series: [
        [20, 45, 15, 20],
        [10, 40, 20, 30]
      ]
    };
  }

  /*
  Param: None
  Return: None
  Func: Create a chart (User)
  */
  getUsersChartData() {
    this.usersChartData = {
      labels: this.UserData.nbNewUsers.labels,
      series: this.UserData.nbNewUsers.series,
    };
    this.usersChartOptions = {
      low: 0,
      high: this.UserData.totalUsers,
      showLine: true,
      showPoint: false,
      showArea: false,
      height: '245px',
      axisX: {
        showGrid: false,
      },
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 3
      }),
    };
  }

  /*
  Param: None
  Return: None
  Func: Create 3 simple cards (Users, New users, Sessions)
  */  
  getSimple() {
    this.nbUsers = 34
    this.nbNewUsers = 459
    this.nbSessions = 87
  }

  /*
  Param: None
  Return: None
  Func: Set default data for all charts
  */  
  setStaticData() {
    this.donutChartOptions = {
      donut: true,
      donutWidth: 40
    }
    this.TrackerChartData = {
      labels: ['Nike'],
      series: [[0]]
    };
    this.usersChartData = { /////////////////
      labels: ['10/01', '10/02', '10/03', '10/04', '10/05', '10/06', '10/07', '10/08', '10/09', '10/10'], /////////////////
      series: [[287, 385, 490, 492, 554, 586, 698, 695, 752, 788], /////////////////
              [67, 152, 143, 240, 287, 335, 435, 437, 539, 542], /////////////////
              [23, 113, 67, 108, 190, 239, 307, 308, 439, 410], /////////////////
              [354, 537, 633, 632, 841, 911, 1133, 1112, 1291, 1330]] /////////////////
    }; //////////////////////////////
    this.usersChartOptions = {
      low: 0,
      high: 3,
      showLine: true,
      showPoint: false,
      showArea: false,
      height: '245px',
      axisX: {
        showGrid: false,
      },
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 3
      }),
    };
    this.usersChartResponsive = [
      ['screen and (max-width: 640px)', {
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0]
          }
        }
      }]
    ];
    this.usersChartLegendItems = [
      { title: 'Men', imageClass: 'fa fa-circle text-men' },
      { title: 'Women', imageClass: 'fa fa-circle text-women' },
      { title: 'New users', imageClass: 'fa fa-circle text-Samsung' },
      { title: 'Total', imageClass: 'fa fa-circle text-skiing' }
    ];
    this.EngagementChartData =  { //////
      labels: ['Users'], /////////
      series: [ /////////
        [6.7], /////////
        [3.3] ///////
      ] ////////
    }; ///////////
    this.EngagementChartOptions = {
      seriesBarDistance: 10,
      horizontalBars: true,
      high: 10,
      axisX: {
        type: Chartist.FixedScaleAxis,
        ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      axisY: {
        offset: 70
      }
    };
    this.EngagementChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0]
          }
        }
      }]
    ];
    this.EngagementChartLegendItems = [
      { title: 'Men', imageClass: 'fa fa-circle text-men' },
      { title: 'Women', imageClass: 'fa fa-circle text-women' }
    ];
    this.ExpertiseChartData = { //////////////////////////////////////
      labels: ['Users'], //////////////////////////////////////////
      series: [ ///////////////////////////////////////////////
        [3.20], /////////////////////////////////////////////
        [8.48] ///////////////////////////////////////////
      ] /////////////////////////////////////////////
    }; ///////////////////////////////////////////
    this.ExpertiseChartOptions = {
      seriesBarDistance: 10,
      high: 10,
      horizontalBars: true,
      axisX: {
      	type: Chartist.FixedScaleAxis,
	      ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      axisY: {
        offset: 70
      }
    };
    this.ExpertiseChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0]
          }
        }
      }]
    ];
    this.ExpertiseChartLegendItems = [
      { title: 'Men', imageClass: 'fa fa-circle text-men' },
      { title: 'Women', imageClass: 'fa fa-circle text-women' }
    ];
    this.TrackerChartOptions = {
      seriesBarDistance: 10,
      axisY: {
        offset: 70
      }
    };
    this.TrackerChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0]
          }
        }
      }]
    ];
    this.DeviceChartLegendItems = [
      { title: 'Android', imageClass: 'fa fa-circle text-men' },
      { title: 'Apple', imageClass: 'fa fa-circle text-women' }
    ];
    this.productChartOptions = {
      seriesBarDistance: 10,
      reverseData: true,
      horizontalBars: true,
      high: 100,
      axisX: {
        type: Chartist.FixedScaleAxis,
        ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      },
      axisY: {
        offset: 70
      }
    };
    this.productChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0]
          }
        }
      }]
    ];
    this.productChartLegendItems = [
      { title: 'Men', imageClass: 'fa fa-circle text-men' },
      { title: 'Women', imageClass: 'fa fa-circle text-women' },
    ];
    this.WearChartOptions = {
      seriesBarDistance: 10,
      axisY: {
        offset: 70
      }
    };
    this.WearChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0]
          }
        }
      }]
    ];
    this.interestChartOptions = {
      seriesBarDistance: 10,
      reverseData: true,
      horizontalBars: true,
      high: 100,
      axisX: {
	      type: Chartist.FixedScaleAxis,
	      ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      },
      axisY: {
        offset: 70
      }
    };
    this.interestChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0]
          }
        }
      }]
    ];
    this.interestChartLegendItems = [
      { title: 'Users', imageClass: 'fa fa-circle text-men' },
    ];
  }

  ngOnInit() {
    this.simple = CardType.simple
    this.chart = CardType.chart
    this.usersChartType = ChartType.Line
    this.EngagementChartType = ChartType.Bar
    this.ExpertiseChartType = ChartType.Bar
    this.TrackerChartType = ChartType.Bar
    this.interestChartType = ChartType.Bar
    this.productChartType = ChartType.Bar
    this.WearChartType = ChartType.Bar
    this.DeviceChartType = ChartType.Pie
    this.setStaticData()
  }
}
