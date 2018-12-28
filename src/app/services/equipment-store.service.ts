import {Injectable} from '@angular/core';
import {Equipment} from '../dto/Equipment';
import {EquipmentService} from './equipment.service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {isUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class EquipmentStoreService {

  equipments: Map<string, Equipment>;

  constructor(private equipmentService: EquipmentService) {
  }

  public getEquipments(): Observable<Map<string, Equipment>> {
    if (!isUndefined(this.equipments)) {
      return of(this.equipments);
    }
    return this.equipmentService.getAllEquipments()
      .pipe(
        map(equipments => this.collectToMap(equipments))
      );
  }

  private collectToMap(equipments: Equipment[]): Map<string, Equipment> {
    this.equipments = new Map<string, Equipment>(
      equipments.map(e => [e.id, e] as [string, Equipment])
    );
    return this.equipments;
  }
}
