import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../shared/modules/general/general.module';
import { lastValueFrom, Subscription } from 'rxjs';
import { SocketService } from '../../../services/socket.service';
import { Router } from '@angular/router';
import { AuthServicesService } from '../../../services/auth-services.service';

@Component({
  selector: 'app-alumno-dashboard',
  imports: [GeneralModule],
  templateUrl: './alumno-dashboard.component.html',
  styleUrl: './alumno-dashboard.component.css'
})
export class AlumnoDashboardComponent implements OnInit {
  private socketService = inject(SocketService)
  private router = inject(Router)
  private authService = inject(AuthServicesService)
  notificaciones: string[] = [];
  private notificationSub!: Subscription;




  ngOnInit(): void {
    this.socketService.registerAsStudent()
    this.notificationSub = this.socketService.listenNotification('student')
      .subscribe((msg) => {
        this.notificaciones.push(msg);
      });
  }

  ngOnDestroy(): void {
    this.notificationSub.unsubscribe();
    this.socketService.disconnect();
  }


  async logout() {
    try {
      const response = await lastValueFrom(this.authService.logout())
      this.router.navigate(['login'])
      console.log(response)
    } catch (error: any) {
      console.log(error)
    }
  }

}
