import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentMenuComponent } from './equipment-menu.component';

describe('EquipmentMenuComponent', () => {
  let component: EquipmentMenuComponent;
  let fixture: ComponentFixture<EquipmentMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
