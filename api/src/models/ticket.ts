
export interface tickets
{
    id?: number;
    titulo: string;
    descripcion: string;
    tipoIncidencia: 'bugs' | 'mejora' | 'problemas' | 'soporte' | 'seguridad';
    estadoTrabajo: string;
    fechaInicio?: Date;
    fechaFin: Date;
    notas?: string;
}