import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { GeneralModule } from '../../../shared/modules/general/general.module';
import { Subscription } from 'rxjs';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-alumno-dashboard',
  imports: [HeaderComponent, GeneralModule],
  templateUrl: './alumno-dashboard.component.html',
  styleUrl: './alumno-dashboard.component.css'
})
export class AlumnoDashboardComponent implements OnInit {
  private socketService = inject(SocketService)



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
}
