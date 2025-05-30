import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { PerfilComponent } from './shared/components/perfil/perfil.component';
import { AlumnoDashboardComponent } from './alumno/pages/alumno-dashboard/alumno-dashboard.component';
import { AlumnoHistorialComponent } from './alumno/pages/alumno-historial/alumno-historial.component';
import { AdminDashboardComponent } from './admin/pages/admin-dashboard/admin-dashboard.component';



export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'alumno',
        component: AlumnoDashboardComponent
    },
    {
        path: 'alumno-historial',
        component: AlumnoHistorialComponent
    },
    {
        path: 'admin',
        component: AdminDashboardComponent
    },
    //ruta login component
    { path: 'login', component: LoginComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: '**', component: LoginComponent },

];
