import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'registro',component:RegistroComponent},

];
