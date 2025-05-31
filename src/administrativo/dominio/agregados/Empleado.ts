import { NivelPermisos, Permiso } from "../value-objects/Permiso";
import { Rol } from "../value-objects/Rol";

export type EmpleadoID = string;

export class Empleado{
    constructor(
        public readonly id:EmpleadoID,
        public readonly email:string,
        public readonly codigo:string,
        public readonly nombre:string,
        public readonly password:string,
        public readonly rol:Rol,
        public readonly permisosExtra?:Permiso[]
    ){}

    esAdmin(){
        return this.rol === Rol.ADMIN
    }
    tienePermisoGE(){
        return this.permisosExtra?.some(permiso => permiso.equals('GE'))
    }
    tienePermisoGR(){
        return this.permisosExtra?.some(permiso => permiso.equals('GR'))
    }
    tienePermisoGH(){
        return this.permisosExtra?.some(permiso => permiso.equals('GH'))
    }
    consultarNivelPermiso(nivel:NivelPermisos):boolean{
        switch(nivel){
          case NivelPermisos.CREAR: return this.permisosExtra?.some(permiso => permiso.puedeCrear()) ?? false;
          case NivelPermisos.MODIFICAR: return this.permisosExtra?.some(permiso => permiso.puedeModificar()) ?? false;
          case NivelPermisos.ELIMINAR: return this.permisosExtra?.some(permiso => permiso.puedeEliminar()) ?? false;
          default: throw new Error("Nivel de Permiso incorrecto - 1,2,3")
        } 
    }

    //PermisoEmpleado
    puedeDarAltaEmpleado(){
        return this.esAdmin() || (this.tienePermisoGE() && this.consultarNivelPermiso(NivelPermisos.CREAR))
    }
    puedeModificarEmpleado(){
        return this.esAdmin() || (this.tienePermisoGE() && this.consultarNivelPermiso(NivelPermisos.MODIFICAR))
    }
    puedeEliminarEmpleado(){
        return this.esAdmin() || (this.tienePermisoGE() && this.consultarNivelPermiso(NivelPermisos.ELIMINAR))
    }
    //PermisoReserva
    puedeDarAltaReserva(){
        return this.esAdmin() || ( this.tienePermisoGR() && this.consultarNivelPermiso(NivelPermisos.CREAR))
    }
    puedeModificarReserva(){
        return this.esAdmin() || (this.tienePermisoGR() && this.consultarNivelPermiso(NivelPermisos.MODIFICAR))
    }
    puedeEliminarReserva(){
        return this.esAdmin() || this.tienePermisoGR() && this.consultarNivelPermiso(NivelPermisos.ELIMINAR)
    }
    //PermisoHabitacion
    puedeDarAltaHabitacion(){
        return this.esAdmin() || (this.tienePermisoGH() && this.consultarNivelPermiso(NivelPermisos.CREAR))
    }
    puedeModificarHabitacion(){
        return this.esAdmin() || (this.tienePermisoGH() && this.consultarNivelPermiso(NivelPermisos.MODIFICAR))
    }
    puedeEliminarHabitacion(){
        return this.esAdmin() || (this.tienePermisoGH() && this.consultarNivelPermiso(NivelPermisos.ELIMINAR))
    }

    darAltaEmpleado(){
        if(this.puedeDarAltaEmpleado()){
            console.log("Crear Empleado")
            return
        }
        throw new Error(`Empleado ${this.id} no tiene permisos para dar de alta a otros empleados`);
    }
    modificarEmpleado(){
        if(this.puedeModificarEmpleado()){
            console.log(`Usuario ${this.id} modificado`)
            return
        }
        throw new Error(`Empleado ${this.id} no tiene permisos para modificar otros empleados`);
    }
    eliminarEmpleado(){
        if(this.puedeEliminarEmpleado()){
            console.log(`Usuario ${this.id} eliminado`)
            return
        }
        throw new Error(`Empleado ${this.id} no tiene permisos para eliminar otros empleados`);
    }
}
/*
const empleado:Empleado = new Empleado("1","carlos-medin@hotmail.com","06192698","Carlos","@qwerty",Rol.STAFF,[new Permiso("GE",3,"Permiso de gestion Empleado")]);
empleado.modificarEmpleado()
empleado.darAltaEmpleado()
empleado.eliminarEmpleado()*/
