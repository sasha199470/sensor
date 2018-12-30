import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSensorComponent } from './chart-sensor.component';

describe('ChartSensorComponent', () => {
  let component: ChartSensorComponent;
  let fixture: ComponentFixture<ChartSensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartSensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
