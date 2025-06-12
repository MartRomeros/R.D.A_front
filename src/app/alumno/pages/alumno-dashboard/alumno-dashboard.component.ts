import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ChartComponent } from './components/chart/chart.component';
import { TablaHorasComponent } from './components/tabla-horas/tabla-horas.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { ActividadFormComponent } from './components/actividad-form/actividad-form.component';
import { GeneralModule } from '../../../shared/modules/general/general.module';
import { AuthServicesService } from '../../../services/auth-services.service';

@Component({
  selector: 'app-alumno-dashboard',
  imports: [HeaderComponent, GeneralModule],
  templateUrl: './alumno-dashboard.component.html',
  styleUrl: './alumno-dashboard.component.css'
})
export class AlumnoDashboardComponent {

  authService:AuthServicesService = inject(AuthServicesService)

  private async isAuth(){

  }

}
