interface Area_trabajo {
    id: number,
    nombre: string
}

export interface Actividad {
    area_trabajo: Area_trabajo
    area_trabajo_id: number,
    estado: true,
    fecha_actividad: Date,
    hora_inic_activdad: Date,
    hora_term_actividad: Date,
    id_actividad: number,
    run_alumno: string
}

export interface Alumno {
    actividades: Actividad[],
    apellido_materno: string,
    apellido_paterno: string,
    area_trabajo_id?: number,
    email: string,
    fono: number,
    nombre: string,
    password: string,
    run: string,
    tipo_usuario: number
}

export interface TotalesMes {
    alumnosAyudantes: number,
    totales: number,
    totalesArea: number
}

export interface Administrador {
    id: number,
    run: string,
    nombre: string,
    apellido_paterno: string,
    apellido_materno: string,
    fono: number,
    email: string,
    password: string,
    tipo_usuario_id: number,
    area_trabajo_id: number,
    area_trabajo: Area_trabajo
}

export interface Detalles {
    id: number,
    run: string,
    nombre: string,
    apellido_paterno: string,
    apellido_materno: string,
    fono: number,
    email: string,
    password: string,
    tipo_usuario_id: number,
    area_trabajo_id: number,
    area_trabajo: Area_trabajo,
    horasTotales: number,
    horasTotalesMes: number,
    actividadesMes: Actividad[]
}

export interface ModeloOc{
    "N° OC":number,
    ALUMNO:string,
    "RUT Alumno":string,
    "Total BH OC":Number
}