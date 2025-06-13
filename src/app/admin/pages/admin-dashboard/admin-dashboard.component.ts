import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { GeneralModule } from '../../../shared/modules/general/general.module';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [HeaderComponent, GeneralModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  private socketService = inject(SocketService)
  private router: Router = new Router()

  notificaciones: string[] = [];
  private notificationSub!: Subscription;


  ngOnInit(): void {
    this.notificationSub = this.socketService.listenAdminNotifications()
      .subscribe((msg) => {
        this.notificaciones.push(msg);
        console.log(this.notificaciones)
      });
  }

  ngOnDestroy(): void {
    this.notificationSub.unsubscribe();
    this.socketService.disconnect();
  }


  goTo(ruta: string) {
    this.router.navigate([ruta])
  }

  async exportar() {
    try {

    } catch (error) {
      console.error(error)
    }
  }

}
