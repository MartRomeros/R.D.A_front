import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GeneralModule } from '../../../shared/modules/general/general.module';
import { Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { SocketService } from '../../../services/socket.service';
import { ReportesServicesService } from '../../../services/reportes-services.service';
import { AuthServicesService } from '../../../services/auth-services.service';
import { SolicitudService } from '../../../services/admin/solicitud.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dashboard',
  imports: [GeneralModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  private socketService = inject(SocketService)
  private reporteService = inject(ReportesServicesService)
  private router: Router = inject(Router)
  private authService = inject(AuthServicesService)
  private solicitudService = inject(SolicitudService)
  private snackBar = inject(MatSnackBar)

  notificaciones: string[] = [];
  private notificationSub!: Subscription;



  async ngOnInit() {
    this.socketService.registerAsAdmin()
    this.notificationSub = this.socketService.listenNotification('admin')
      .subscribe((msg) => {
        this.openSnackBar()
        this.notificaciones.push(msg)
        this.solicitudService.traerSolicitudesMes()
        .subscribe({
          next:(response)=>{
            this.solicitudService.setSolicitud(response.solicitudes)
            this.solicitudService.setAllSolicitudes(response.solicitudes)
          }
        })
        
      });
  }

  ngOnDestroy(): void {
    this.notificationSub.unsubscribe();
    this.socketService.disconnect();
  }

  goTo(ruta: string) {
    this.router.navigate([ruta])
  }

  async downloadExcel() {
    try {
      const response = await lastValueFrom(this.reporteService.traerDatosAExportar())
      console.log(response)
      this.reporteService.exportToExcel(response).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resumen_mensual.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });

    } catch (error) {
      console.log(error)
    }
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

  openSnackBar(){
    this.snackBar.open('Nueva actividad registrada!','deshacer',{
      duration:3000
    })
  }




}
