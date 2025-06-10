//CODIGOS: ADM (Creacion,Modificacion,Eliminacion DE TODO) - Admin, GR (Gestion de Reservas), GE (Gestion de Empleados), GH (Gestionar Habitaciones)
//Nivel: 1(Crear),2(Modificar),3(Eliminar)
export enum NivelPermisos {
    CREAR = 1,
    MODIFICAR = 2,
    ELIMINAR = 3
}
export type CodigosPermisos = 'ADM' | 'GR' | 'GE' | 'GH' 
export type NivelPermiso = 1 | 2 | 3
export class Permiso {
    constructor(
        public readonly codigo:CodigosPermisos,
        public readonly nivel:NivelPermiso,
        public readonly descripcion:String
    ){}

    puedeCrear():boolean{
        return this.nivel >= NivelPermisos.CREAR
    }

    puedeModificar():boolean{
        return this.nivel >= NivelPermisos.MODIFICAR
    }

    puedeEliminar():boolean{
        return this.nivel >= NivelPermisos.ELIMINAR
    }

    equals(codigo:CodigosPermisos):boolean{
        return codigo === this.codigo
    }

    static fromPrimitive(value:any[]):Permiso[]{
        if(!Array.isArray(value)){
            throw new Error("Permiso extra invalido")
        }

        return value.map((permiso:Permiso,i) => {
            if(!permiso.codigo || !permiso.descripcion || !permiso.nivel){
                throw new Error(`Permisos numero ${i} EXTRAS Invalidos`)
            }
            return new Permiso(
                permiso.codigo,
                permiso.nivel,
                permiso.descripcion
            )
        })
    }
}