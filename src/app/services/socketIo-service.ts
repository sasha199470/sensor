import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {SensorData} from '../dto/sensor-data';
import {ITS, ITSForecast} from "../dto/its";
import {DefectMessage} from "../dto/defect-message";

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  socketClient: SocketIOClient.Socket;

  constructor() {
    this.socketClient = io.connect('http://192.168.1.61:9090');
  }

  public getSensorDate(id: string): Observable<SensorData> {
    const socketClient = this.socketClient;
    return new Observable<SensorData>(observer => {
      const successListener = (value: SensorData) => {
        // console.log(value);
        observer.next(value);
      };
      socketClient.emit('sensor-' + id);
      socketClient.on('sensor-' + id + '-input', successListener);

      return {
        unsubscribe() {
          // this.socketClient.emit('sensor-' + id + '-unsub');
          socketClient.removeListener('sensor-' + id + '-input', successListener);
        }
      };
    });
  }

  public getStateDate(id: string): Observable<ITSForecast> {
    const socketClient = this.socketClient;
    return new Observable<ITSForecast>(observer => {
      const successListener = (value: SensorData, forecast: SensorData[]) => {
        // console.log(value);
        observer.next({its: value, forecast: forecast});
      };
      socketClient.emit('its.' + id);
      socketClient.on('its.' + id + '.input', successListener);

      return {
        unsubscribe() {
          // this.socketClient.emit('sensor-' + id + '-unsub');
          socketClient.removeListener('sensor.' + id + '.input', successListener);
        }
      };
    });
  }
  public getDefect(id: string): Observable<DefectMessage> {
    const socketClient = this.socketClient;
    return new Observable<DefectMessage>(observer => {
      const successListener = (value: DefectMessage) => {
        // console.log(value);
        observer.next(value);
      };
      socketClient.emit('defect.' + id);
      socketClient.on('defect.' + id + '.input', successListener);

      return {
        unsubscribe() {
          // this.socketClient.emit('sensor-' + id + '-unsub');
          socketClient.removeListener('defect.' + id + '.input', successListener);
        }
      };
    });
  }


}
