import {Injectable} from '@angular/core';
import {Equipment} from '../dto/Equipment';
import {EquipmentService} from './equipment.service';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {isUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class EquipmentStoreService {

  equipments: Equipment[];

  constructor(private equipmentService: EquipmentService) {
  }

  public getEquipmentsMenu(): Observable<Equipment[]> {
    if (!isUndefined(this.equipments)) {
      return of(this.equipments);
    }
    return this.equipmentService.getEquipmentsMenu()
      .pipe(
        tap(equipments => this.equipments = equipments)
      );
  }
}
