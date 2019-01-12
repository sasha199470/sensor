import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {SensorData} from '../dto/sensor-data';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  socketClient: SocketIOClient.Socket;

  constructor() {
    this.socketClient = io.connect('http://127.0.0.1:9090');
  }

  public getSensorDate(id: string): Observable<SensorData> {
    const socketClient = this.socketClient;
    return new Observable<SensorData>(observer => {
      const successListener = (value: SensorData) => {
        console.log(value);
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


}
