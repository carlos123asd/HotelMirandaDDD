//CODIGOS: ADM (Creacion,Modificacion,Eliminacion DE TODO) - Admin, GR (Gestion de Reservas), GE (Gestion de Empleados), GH (Gestionar Habitaciones)
//Nivel: 1(Crear),2(Modificar),3(Eliminar)
export type CodigosPermisos = 'ADM' | 'GR' | 'GE' | 'GH' 
export type NivelPermisos = 1 | 2 | 3
export class Permiso {
    constructor(
        public readonly codigo:CodigosPermisos,
        public readonly nivel:NivelPermisos,
        public readonly descripcion:String
    ){}

    puedeCrear():boolean{
        return this.nivel >= 1
    }

    puedeModificar():boolean{
        return this.nivel >= 2
    }

    puedeEliminar():boolean{
        return this.nivel >= 3
    }

    equals(codigo:CodigosPermisos):boolean{
        return codigo === this.codigo
    }
}