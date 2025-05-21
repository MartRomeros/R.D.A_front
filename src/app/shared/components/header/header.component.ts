import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthServicesService } from '../../../services/auth-services.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule,MatToolbarModule,MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private authService = inject(AuthServicesService)
  private router = new Router()


  async logout() {
    try {
      const response = await lastValueFrom(this.authService.logout())
      this.router.navigate(['login'])
      console.log(response)
    } catch (error: any) {
      console.log(error)
    }
  }

  isMobile(): boolean {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  goToPerfil(){
    this.router.navigate(['perfil'])
  }

  goHome(){
    this.router.navigate(['alumno'])
  }

  goHistorial(){
    this.router.navigate(['alumno-historial'])
  }

}
