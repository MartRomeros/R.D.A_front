import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { GeneralModule } from '../../../shared/modules/general/general.module';
import { AuthServicesService } from '../../../services/auth-services.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno-dashboard',
  imports: [HeaderComponent, GeneralModule],
  templateUrl: './alumno-dashboard.component.html',
  styleUrl: './alumno-dashboard.component.css'
})
export class AlumnoDashboardComponent {

  private authService: AuthServicesService = inject(AuthServicesService)
  private router:Router = new Router()
  



  private async isAuth() {
    try {
      await lastValueFrom(this.authService.isAuthenticated())
    } catch (error) {
      this.router.navigate(['/login'])
    }

  }

}
