import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Equipment} from '../dto/Equipment';
import {HttpClient, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private readonly BASE_URL = 'api';

  constructor(private http: HttpClient) {
  }

  public getEquipmentsMenu(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.BASE_URL}/equipment`);
  }

  public getEquipment(id: string): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.BASE_URL}/equipment/${id}`);
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
}
