/**nombre, apellidos, correo, tipoUsuario */

export interface usuario
{
    idUsuario?:number;
    nombre: string;
    apellidos: string;
    correo: string;
    tipoUsuario: 'programador' | 'usuario';
}