import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LegendItem, ChartType } from '../../lbd/lbd-chart/lbd-chart.component';
import { legendCountries } from '../../color-map/color-map.component';

export interface LegendItem {
	title: string
	imageClass: string
}

export enum CardType {
	simple,
	chart,
	map
}

export enum MapType {
	bubble,
	color
}

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss']
})


export class CardComponent implements OnInit, AfterViewInit {

	static currentId = 1

	@Input()
	public cardTitle: string

	@Input()
	public cardSubtitle: string

	@Input()
	public cardData: any

	@Input()
	public cardType: CardType

	@Input()
	public cardIcon: string

	@Input()
	public cardImg: string

	@Input()
	public chartClass: string

	@Input()
	public chartType: ChartType

	@Input()
	public chartData: any

	@Input()
	public chartOptions: any

	@Input()
	public chartResponsive: any[]

	@Input()
	public legendItems: LegendItem[]

	@Input()
	public cardFooterText: string

	@Input()
	public mapType: MapType

	@Input()
	public mapData: any

	@Input()
	public showToggle: boolean

	public chartId: string

	public checkChart: boolean
	public checkMap: boolean
	public checkSimple: boolean
	public checkBubble: boolean
	public checkColor: boolean

	@Input()
	public legendCountries: legendCountries[]

	@Output()
  labelDegreeChange = new EventEmitter()

	constructor() { }

	/*
  Param: event
  Return: None
  Func: emit the change value of Celsius/Fahrenheit
  */
	updateLabelDegree(event) {
    this.labelDegreeChange.emit(event)
	}
	
	ngOnInit() {
		this.chartId = `lbd-chart-${CardComponent.currentId++}`
		this.checkChart = false
		this.checkMap = false
		this.checkSimple = false
		this.checkBubble = false
		this.checkColor = false
		if (this.cardType == CardType.chart) {
			this.checkChart = true
		}
		if (this.cardType == CardType.map) {
			this.checkMap = true
			if (this.mapType == MapType.bubble) {
				this.checkMap = true
				this.checkBubble = true
			}
			if (this.mapType == MapType.color) {
				this.checkMap = true
				this.checkColor = true
			}
		}
		if (this.cardType == CardType.simple) {
			this.checkSimple = true
		}
	}

	public ngAfterViewInit(): void {

		switch (this.cardType) {
			case CardType.chart:
				break;
			case CardType.simple:
				break;
			case CardType.map:
				break;
		}
	}
}