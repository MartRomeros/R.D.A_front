import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../shared/modules/general/general.module';
import { lastValueFrom, Subscription } from 'rxjs';
import { SocketService } from '../../../services/socket.service';
import { Router } from '@angular/router';
import { AuthServicesService } from '../../../services/auth-services.service';
import { ActividadService } from '../../../services/alumno/actividad.service';
import { AlumnoService } from '../../../services/alumno/alumno.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private actividadService = inject(ActividadService)
  private alumnoService = inject(AlumnoService)
  private snackBar = inject(MatSnackBar)
  notificaciones: string[] = [];
  private notificationSub!: Subscription;




  ngOnInit(): void {
    this.socketService.registerAsStudent()
    this.notificationSub = this.socketService.listenNotification('student')
      .subscribe((msg) => {
        this.openSnackBar()
        this.notificaciones.push(msg);
        this.alumnoService.traerResumenMes().subscribe({
          next: (response) => {
            this.actividadService.setResumenMes(response)
          }
        })

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

  openSnackBar() {
    this.snackBar.open('Nueva se ha aprobado tu actividad', 'deshacer', {
      duration: 3000
    })
  }

}
