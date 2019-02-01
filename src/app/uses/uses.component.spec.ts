/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsesComponent } from './uses.component';

describe('TablesComponent', () => {
  let component: UsesComponent;
  let fixture: ComponentFixture<UsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
