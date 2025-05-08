// OJO este es solo un modelo de datos para ejemplificar que la tabla de reporte esta funcionando, no contribuye nada al uso de la api
export interface Reporte {
    id: string;
    codigo: string;
    alumno: string;
    asignatura: string;
    tipo: string;
    fecha: string;
    estado: 'pendiente' | 'aprobado' | 'rechazado';
    horas: number;
}
