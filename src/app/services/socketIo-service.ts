import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  socketClient: SocketIOClient.Socket;

  constructor(private http: HttpClient) {
    this.socketClient = io.connect('http://192.168.1.61:9090');
  }

  public getSensorDate<SensorData>(id: string): Observable<SensorData> {
    const socketClient = this.socketClient;
    return new Observable<SensorData>(observer => {
      const successListener = (value: SensorData) => {
        console.log(value)
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
    })
  }


}
