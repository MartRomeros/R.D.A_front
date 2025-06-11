import { Routes } from '@angular/router';
import { PerfilComponent } from './shared/components/perfil/perfil.component';
import { AlumnoDashboardComponent } from './alumno/pages/alumno-dashboard/alumno-dashboard.component';
import { AlumnoHistorialComponent } from './alumno/pages/alumno-historial/alumno-historial.component';
import { AdminDashboardComponent } from './admin/pages/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { ForgotPasswordComponent } from './auth/pages/forgot-password/forgot-password.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { SolicitudesComponent } from './admin/pages/admin-dashboard/components/solicitudes/solicitudes.component';
import { AdminTablaComponent } from './admin/pages/admin-dashboard/components/admin-tabla/admin-tabla.component';



export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [authGuardGuard]
    },
    {
        path: 'alumno',
        component: AlumnoDashboardComponent,
        //canActivate: [authGuardGuard, alumnoGuard]
    },
    {
        path: 'alumno-historial',
        component: AlumnoHistorialComponent,
    },
    {
        path: 'admin',
        component: AdminDashboardComponent,
        children:[
            {path:'solicitudes',component:SolicitudesComponent},
            {path:'alumnos',component:AdminTablaComponent},
            {path:'',redirectTo:'solicitudes',pathMatch:'full'}
        ]
    },
    //ruta login component
    {
        path: 'login',
        component: LoginComponent,
        //canActivate: [authGuardGuard]
    },
    {
        path: 'perfil',
        component: PerfilComponent,
        canActivate: [authGuardGuard]
    },
    {
        path: 'forgot-password', component: ForgotPasswordComponent,
        canActivate: [authGuardGuard]
    },
    {
        path: 'no_autorizado',
        component: UnauthorizedComponent
    },
    {
        path: '**', component: LoginComponent,
        canActivate: [authGuardGuard]
    },

];
