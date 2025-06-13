import { inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client'
import { ruta } from './rutas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {


  private socket!: Socket

  constructor() {
    this.socket = io(ruta, {
      withCredentials: true  // permite el envío de cookies si las usas para auth
    });

    this.socket.emit('registerAdmin')
  }

  listenAdminNotifications(): Observable<string> {
    return new Observable<string>((subscriber) => {
      this.socket.on('adminNotification', (message: string) => {
        subscriber.next(message);
      });
    });
  }

  disconnect(): void {
    this.socket.disconnect();
  }




}
