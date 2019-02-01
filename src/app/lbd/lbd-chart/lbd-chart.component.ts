import { Component, Input, OnInit, AfterViewInit, ChangeDetectionStrategy, ViewChild, SimpleChanges, Output } from '@angular/core';
import * as Chartist from 'chartist';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';

import { AppComponent } from '../../app.component'

import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { EventEmitter } from '@angular/core';

export interface LegendItem {
  title: string;
  imageClass: string;
}

export enum ChartType {
  Pie,
  Line,
  Bar
}

interface DataCsv {
  labels: string;
  data: Array<any>;
  legend: string;
}

@Component({
  selector: 'lbd-chart',
  templateUrl: './lbd-chart.component.html',
  styleUrls: ['./lbd-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LbdChartComponent implements OnInit, AfterViewInit {
  static currentId = 1;

  @Input()
  public title: string;

  @Input()
  public subtitle: string;

  @Input()
  public chartClass: string;

  @Input()
  public chartType: ChartType;

  @Input()
  public chartData: (Promise<Chartist.IChartistData> | Chartist.IChartistData);

  @Input()
  public chartOptions: any;

  @Input()
  public chartResponsive: any[];

  @Input()
  public footerIconClass: string;

  @Input()
  public footerText: string;

  @Input()
  public legendItems: LegendItem[];

  @Input()
  public withHr: boolean;

  @Input()
  public showToggle: boolean;

  public btnId: string;

  public container: String;

  public chartId: string;
  public legendId: string;
  public PdfId: string;
  public titleId: string;
  public subtitleId: string;
  public classOverride: string;

  public degree: boolean;

  public myChart;

  toggleDegree: string;

  @Output()
  labelDegreeChange = new EventEmitter();

  constructor(private appComponent: AppComponent) {
    this.degree = appComponent.isCel
    if (appComponent.isCel == true) {
      this.toggleDegree = "°C"
    }
    else {
      this.toggleDegree = "°F"
    }
  }

  /*
  Param: nb: int
  Return: None
  Func: Onlick dropdown function
  */
  public ClickListener(nb) {
    if (this.chartType === ChartType.Pie)
      var style = 1
    else
      var style = 0
    if (nb == 1)
      this.downloadPng(this.chartId, this.legendId);
    if (nb == 2)
      this.downloadPdf(this.chartId, this.legendId, this.PdfId, this.legendItems, style);
    if (nb == 3)
      this.downloadCsv(this.chartId, this.chartData, this.legendItems);
  }

  /*
  Unused DEBUG
  */
  public displayLegend(legend) {
    for (var i = 0; i != legend.length; i++) {
      console.log("Legend #"+i+" "+legend[i].title)
    }
  }

  /*
  Param: nb: int
  Return: color: array (RBG code)
  Func: Get the color for the legend (buble)
  */
  public getRGB(nb) {
    var arrColor = [[25,118,210],[244,67, 54],[103,58,183],[239,108,0],[67,160,71],[251,192,45],[158,158,158],[216,27,96],[0,172,193],[142,36,170],[93,64,55]]
    return (arrColor[nb])
  }

  /*
  Param: chartId: string, chartData: object, chartLegend: array
  Return: None
  Func: download csv (chart)
  */
  public downloadCsv(id, data, legend) {
    var newData = [];
    for (var i = 0; i != legend.length; i++) {
      var tmp: DataCsv;
      tmp = { labels: data.labels[i], data: data.series[i], legend: legend[i].title };
      newData.push(tmp);
    }
    new Angular5Csv(newData, id);
  }

  /*
  Param: chartId: string, chartLegend: array
  Return: None
  Func: download png (chart)
  */
  public downloadPng(id, legend) {
    var name = "#" + id
    this.inlineCSStoSVG(name);
    var container = document.querySelector(name);
    var svg  = document.querySelector(name+" svg");
    var Elementlegend  = document.querySelector("#"+legend);
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute('width', container.clientWidth.toString());
    svg.setAttribute('height', container.clientHeight.toString());
    var svgData = (new XMLSerializer()).serializeToString(svg);
    var canvas = document.createElement("canvas");
    var svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    var ctx = canvas.getContext("2d");
    var img = document.createElement("img");
    img.setAttribute('crossOrigin', 'use-credentials');
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
      var link = document.createElement('a');
      setTimeout(() => {
        var imgsrc = canvas.toDataURL("image/png");
        link.download = 'chart'+id+'.jpeg';
        link.href = imgsrc;
        link.click();
      }, 500);
    };
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))) );
  }

  /*
  Param: chartId: string, chartLegend: array, id_pdf: string, legendLabel: array, chartStyle: Object
  Return: None
  Func: download pdf
  */
  downloadPdf = (id, legend, id_pdf, arrLegend, chartStyle) => {
    var name = "#" + id
    var content = "#" + id_pdf
    this.inlineCSStoSVG(name);
    var container = document.querySelector(name);
    var svg  = document.querySelector(name+" svg");
    console.log(name)
    var Elementlegend = document.querySelector("#"+legend);
    var ElementClassLegend = document.querySelectorAll("#"+legend+" i")
    var ElementTitle = document.querySelector("#"+this.titleId)
    var ElementSubTitle = document.querySelector("#"+this.subtitleId)
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute('width', container.clientWidth.toString());
    svg.setAttribute('height', container.clientHeight.toString());
    var svgData = (new XMLSerializer()).serializeToString(svg);
    var canvas = document.createElement("canvas");
    var svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    var ctx = canvas.getContext("2d");
    var img = document.createElement("img");
    img.setAttribute('crossOrigin', 'use-credentials');
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
      var doc = new jsPDF();
      var width = doc.internal.pageSize.getWidth();
      setTimeout(() => {
        if (chartStyle == 1) {
          var newWidth = width / 2
          var newHeight = (canvas.height * width / canvas.width) / 2
        }
        else {
          var newWidth = width
          var newHeight = (canvas.height * width / canvas.width)
        }
        var imgsrc = canvas.toDataURL("image/png");
        /* Write : Title & Subtitle */
        doc.fromHTML(ElementTitle, 10, 0);
        doc.fromHTML(ElementSubTitle, 10, 10);

        /* Write : Chart */
        doc.addImage(imgsrc, 'PNG', 0, 20, newWidth, newHeight);

        /* Write : Circle */
        var maxLn = 190
        var currentCircleLg = newHeight + 40 //+6
        var currentCircleLn = 2
        var sizeCircle = 1
        var nb = 0
        var arrColor = [[25,118,210],[244,67, 54],[103,58,183],[239,108,0],[67,160,71],[251,192,45],[158,158,158],[216,27,96],[0,172,193],[142,36,170],[93,64,55]]
        arrLegend.forEach(el => {
          if (nb != 0) {
            if (el.title.length + currentCircleLn + 30 + 3 < maxLn)
              currentCircleLn += 30
            else {
              currentCircleLn = 2
              currentCircleLg += 10
            }
          }
          doc.setDrawColor(0)
          doc.setFillColor(arrColor[nb][0], arrColor[nb][1], arrColor[nb][2])
          doc.circle(currentCircleLn, currentCircleLg, sizeCircle, 'FD')
          nb++
        });

        /* Write : Legend */
        var currentLn = 5
        var currentLg = newHeight + 34 // +0
        nb = 0
        arrLegend.forEach(el => {
          if (nb != 0) {
            if (el.title.length + currentLn + 30 < maxLn)
                currentLn += 30
            else {
              currentLn = 5
              currentLg += 10
            }
          }
          doc.fromHTML(el.title, currentLn, currentLg)
          nb++;
        });

        // /* Write : Chart */
        // doc.addImage(imgsrc, 'PNG', 0, 20, width, canvas.height * width / canvas.width);

        /* Save : PDF */
        doc.save('chart'+id+'.pdf');
      }, 500);
    };
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))) );
  }

  /*
  Param: chartId: string
  Return: None
  Func: convert the svg style in a good format (export)
  */
  inlineCSStoSVG = (name) => {
    var nodes = document.querySelectorAll(name+" *");
    for (var i = 0; i < nodes.length; ++i) {
      var elemCSS = window.getComputedStyle(nodes[i], null);
      (nodes[i] as HTMLElement).removeAttribute('xmlns');
      (nodes[i] as HTMLElement).style.fill = elemCSS.fill;
      (nodes[i] as HTMLElement).style.fillOpacity = elemCSS.fillOpacity;
      (nodes[i] as HTMLElement).style.stroke = elemCSS.stroke;
      (nodes[i] as HTMLElement).style.strokeLinecap = elemCSS.strokeLinecap;
      (nodes[i] as HTMLElement).style.strokeDasharray = elemCSS.strokeDasharray;
      (nodes[i] as HTMLElement).style.strokeWidth = elemCSS.strokeWidth;
      (nodes[i] as HTMLElement).style.fontSize = elemCSS.fontSize;
      (nodes[i] as HTMLElement).style.fontFamily = elemCSS.fontFamily;
      if ((nodes[i] as HTMLElement).nodeName === "SPAN") {
        (nodes[i] as HTMLElement).setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
      }
    }
  }

  public ngOnInit(): void {
    this.chartId = `lbd-chart-${LbdChartComponent.currentId++}`;
    this.legendId = `legend-${LbdChartComponent.currentId++}`;
    this.btnId = `export-${LbdChartComponent.currentId}`;
    this.PdfId = `pdf-${LbdChartComponent.currentId}`;
    this.titleId = `title-${LbdChartComponent.currentId}`
    this.subtitleId = `subtitle-${LbdChartComponent.currentId}`
    if (this.chartType === ChartType.Pie || this.chartType == ChartType.Bar) {
      this.classOverride = 'pie-chart';
    }
  }

  /*
  Param: None
  Return: None
  Func: create a chart: Chartist
  */
  public ngAfterViewInit(): void {
    switch (this.chartType) {
      case ChartType.Pie:
        this.myChart = new Chartist.Pie(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
      case ChartType.Line:
        this.myChart = new Chartist.Line(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
      case ChartType.Bar:
        this.myChart = new Chartist.Bar(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.update(changes);
  }

  /*
  Param: num: int
  Return: None
  Func: Get labels for OutsideTemp chart (Fahrenheit/Celsius)
  */
  onChange(num) {
    if (num == 1) {
      this.appComponent.isCel = true
      this.toggleDegree = "°C"
      this.labelDegreeChange.emit("'20°C-25°C', '15°C-20°C', '10°C-15°C', '5°C-10°C', '0°C-5°C', '-5°C-0°C', 'below -5°C'")
    }
    else {
      this.appComponent.isCel = false
      this.toggleDegree = "°F"
      this.labelDegreeChange.emit("'68°F-77°F', '59°F-68°F', '50°F-59°F', '41°F-50°F', '32°F-41°F', '23°F-32°F', 'below 23°F'")
    }
  }

  /*
  Param: changes: SimpleChanges
  Return: None
  Func: update the chartData / Options from firestore documents
  */
  public update(changes: SimpleChanges): void {
    if (changes.chartData) {
      if (!changes.chartData.firstChange) {
        this.chartData = changes.chartData.currentValue;
        if (!changes.chartOptions)
          this.chartOptions = null
        else
          this.chartOptions = changes.chartOptions.currentValue;
        this.myChart.update(this.chartData, this.chartOptions)
      }
    }
  }
}
