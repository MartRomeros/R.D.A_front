export interface LoginResponse {
    tipoUsuario: number
}

export interface User {
    id: number,
    nombre: string,
    apellido_paterno: string,
    apellido_materno: string,
    email: string,
    fono: number,
    tipo_usuario: number,
    run: string,
    password: string
}

export interface Actividad {
    id_actividad?: number,
    fecha_actividad: string,
    hora_inic_activdad: string,
    hora_term_actividad: string,
    area_trabajo: string,
    run_alumno: string
}

export interface ActividadResponse {
    actividades: Actividad[]
}

export interface DetallesAlumno {
    horasTotales?: number,
    horasTotalesMes?: number,
    horasArea?: {
        difusion: number,
        extension: number,
        comunicacion: number,
        desarrolloLaboral: number
    }
}

export interface AreaTrabajo{
    areas:{
        id:number,
        nombre:string
    }
}