import { CanActivateFn, Router } from '@angular/router';
import { AuthServicesService } from '../services/auth-services.service';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { lastValueFrom } from 'rxjs';
import { User } from '../models/interfaces';

export const authGuardGuard: CanActivateFn = async (route, state) => {
  const authService: AuthServicesService = inject(AuthServicesService);
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);
  const url = state.url;

  try {
    //comprobar si esta autenticado
    const autenticated = await lastValueFrom(authService.isAuthenticated());
    if (!autenticated.isAuthenticated) {
      if (url !== 'login' && url !== '/forgot-password') {
        router.navigate(['/login']);
        return false;
      }
      return true
    }

    //traer al usuario si ya esta autenticado
    const usuario: User = await lastValueFrom(userService.findUserbyEmail());
    //verificar si es alumno y si esta autenticado llevarlo al home de alumno
    if (url === '/login' || url === '/forgot-password') {
      if(usuario.tipo_usuario === 'ALUMNO'){
        router.navigate(['/alumno']);
        return false;
      }
      if(usuario.tipo_usuario === 'ADMIN'){
        router.navigate(['/admin']);
        return false;
      }      
    }

    return true



  } catch (error) {

    if (url !== '/login') {
      router.navigate(['/login']);
      return false;
    }

  }


  return true
};
