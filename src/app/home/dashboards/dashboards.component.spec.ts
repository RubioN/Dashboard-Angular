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
    expect(component.assignColorForUsers(9)).toEqual("#D1CBD0");
    expect(component.assignColorForUsers(49)).toEqual("#BFB6BD");
    expect(component.assignColorForUsers(99)).toEqual("#B6ABB4");
    expect(component.assignColorForUsers(239)).toEqual("#ACA1AB");
    expect(component.assignColorForUsers(459)).toEqual("#A396A1");
    expect(component.assignColorForUsers(998)).toEqual("#9A8C98");
  });
});
