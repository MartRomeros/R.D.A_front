import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { User } from '../models/interfaces';
import { lastValueFrom } from 'rxjs';
import { AuthServicesService } from '../services/auth-services.service';

export const adminGuard: CanActivateFn = async (route, state) => {
  const userService: UserService = inject(UserService);
  const authServices: AuthServicesService = inject(AuthServicesService)
  const url = state.url;
  const router: Router = inject(Router)

  try {
    const usuario: User = await lastValueFrom(userService.findUserbyEmail());
    if (usuario.tipo_usuario === 3) {
      router.navigate(['/no_autorizado']);
      return false
    }

    const response = await lastValueFrom(authServices.isAuthenticated())
    if(!response.isAuthenticated){
      router.navigate(['/login'])
      return false
    }


    return true
  } catch (error: any) {
      router.navigate(['/login']);
      return false;    
  }

  return true;
};
