import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Equipment} from '../dto/equipment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SensorData} from '../dto/sensor-data';
import {ITS} from "../dto/its";


@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private readonly BASE_URL = 'api';

  constructor(private http: HttpClient) {
  }

  public getEquipmentsMenu(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.BASE_URL}/equipment/tree`);
  }

  public getEquipment(id: string): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.BASE_URL}/equipment/${id}`);
  }

  public getAllEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.BASE_URL}/equipment`);
  }

  public getEquipmentChildren(id: string): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.BASE_URL}/equipment/${id}/children`);
  }
  public getSensorData(id: string): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(`${this.BASE_URL}/sensor/${id}`);
  }

  public getDataset(numberPoints: number, chartDimension: string, id: string,
                    middleDate: string): Observable<any> {
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('numberPoints', numberPoints + '');
    params = params.append('chartDimension', chartDimension);
    params = params.append('middleDate', middleDate);
    return this.http.get<any>(`${this.BASE_URL}/equipment/${id}` + '/state',
      {params: params});

  }
  public getDataSetRealTime(id: string): Observable<ITS> {
    return this.http.get<ITS>(`${this.BASE_URL}/equipment/${id}/state/real-time`);
  }
}
