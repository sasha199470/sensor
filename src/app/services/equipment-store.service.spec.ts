import { TestBed } from '@angular/core/testing';

import { EquipmentStoreService } from './equipment-store.service';

describe('EquipmentStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EquipmentStoreService = TestBed.get(EquipmentStoreService);
    expect(service).toBeTruthy();
  });
});
