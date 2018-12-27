import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentSchemeComponent } from './equipment-scheme.component';

describe('EquipmentSchemeComponent', () => {
  let component: EquipmentSchemeComponent;
  let fixture: ComponentFixture<EquipmentSchemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentSchemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
