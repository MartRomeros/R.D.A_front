import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { GeneralModule } from '../../../shared/modules/general/general.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [HeaderComponent,GeneralModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  private router:Router = new Router()

  goTo(ruta:string){
    this.router.navigate([ruta])
  }

}
