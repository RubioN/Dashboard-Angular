import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsComponent } from './dashboards.component';

describe('DashboardsComponent', () => {
  let component: DashboardsComponent;
  let fixture: ComponentFixture<DashboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assignColorForCustomers', () => {
    expect(component.assignColorForCustomers(9)).toEqual("#D1CBD0");
    expect(component.assignColorForCustomers(49)).toEqual("#BFB6BD");
    expect(component.assignColorForCustomers(99)).toEqual("#B6ABB4");
    expect(component.assignColorForCustomers(239)).toEqual("#ACA1AB");
    expect(component.assignColorForCustomers(459)).toEqual("#A396A1");
    expect(component.assignColorForCustomers(998)).toEqual("#9A8C98");
  });
});
