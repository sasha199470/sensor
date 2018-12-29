import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentDefectsComponent } from './equipment-defects.component';

describe('EquipmentDefectsComponent', () => {
  let component: EquipmentDefectsComponent;
  let fixture: ComponentFixture<EquipmentDefectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentDefectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentDefectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
