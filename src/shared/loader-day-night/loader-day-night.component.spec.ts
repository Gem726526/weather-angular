/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoaderDayNightComponent } from './loader-day-night.component';

describe('LoaderDayNightComponent', () => {
  let component: LoaderDayNightComponent;
  let fixture: ComponentFixture<LoaderDayNightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderDayNightComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderDayNightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
