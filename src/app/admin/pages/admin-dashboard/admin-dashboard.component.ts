import { Component } from '@angular/core';
import { AdminResumenComponent } from './components/admin-resumen/admin-resumen.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { GeneralModule } from '../../../shared/modules/general/general.module';
import { AdminTablaComponent } from './components/admin-tabla/admin-tabla.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminResumenComponent,HeaderComponent,GeneralModule,AdminTablaComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
