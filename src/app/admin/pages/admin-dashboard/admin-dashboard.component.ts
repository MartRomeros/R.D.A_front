import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GeneralModule } from '../../../shared/modules/general/general.module';
import { Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { SocketService } from '../../../services/socket.service';
import { ReportesServicesService } from '../../../services/reportes-services.service';
import { AuthServicesService } from '../../../services/auth-services.service';

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

  notificaciones: string[] = [];
  private notificationSub!: Subscription;



  ngOnInit(): void {
    this.socketService.registerAsAdmin()
    this.notificationSub = this.socketService.listenNotification('admin')
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


}
