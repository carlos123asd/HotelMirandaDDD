import { DTOEmpleado } from "../../aplicacion/dtos/DTOEmpleado";
import { NivelPermisos, Permiso } from "../value-objects/Permiso";
import { Rol } from "../value-objects/Rol";

export enum StatusType {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
  SUSPENDIDO = 'suspendido',
}

export class Empleado{
    constructor(
        public readonly id:string,
        public email:string,
        public photo:string,
        public startDate:Date,
        public telefono:string,
        public readonly codigo:string,
        public nombre:string,
        public password:string,
        public rol:Rol,
        public status:StatusType,
        public permisosExtra?:Permiso[],
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

    //Si quisieramos en el futuro formatear los campos o validar campos lo hacemos desde aqui
    static crearDesdeDTO(dto: DTOEmpleado):Empleado{
        return new Empleado(
            dto.id,
            dto.email,
            dto.photo,
            dto.startDate,
            dto.telefono,
            dto.codigo,
            dto.nombre,
            dto.password,
            dto.rol,
            dto.status,
            dto.permisosExtra,
        );
    }
    modificarDesdeDTO(dto: DTOEmpleado):void{
        if(dto.id !== this.id){
            throw new Error("No se puede cambiar el ID empleado")
        }
        this.email = dto.email,
        this.photo = dto.photo,
        this.startDate = dto.startDate,
        this.telefono = dto.telefono,
        this.nombre = dto.nombre,
        this.password = dto.password,
        this.rol = dto.rol,
        this.status = dto.status,
        this.permisosExtra = dto.permisosExtra
    }
}
