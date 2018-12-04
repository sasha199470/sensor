import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Equipment} from '../dto/Equipment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private readonly BASE_URL = 'api';

  constructor(private http: HttpClient) { }

  public getEquipmentsMenu(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.BASE_URL}/equipment`);
  }

  public getEquipment(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.BASE_URL}/equipment/${id}`);
  }
}
