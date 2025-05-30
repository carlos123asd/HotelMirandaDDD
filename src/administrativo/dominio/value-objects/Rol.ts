import { Permisos } from "../agregados/Empleado";
import { Permiso } from "./Permiso";

export type CodigoRol = 'admin' | 'staff'
export class Rol{
    public static readonly ADMIN = new Rol('admin','Administrador',[
        new Permiso("ADM",3,"Rol Administrador con todos los permisos del Sistema")
    ])
    public static readonly STAFF = new Rol('staff','Personal',[
        new Permiso("GR",3,"Rol Empleado con los permisos basicos del Sistema para gestionar reservas")
    ])
    constructor(
        public readonly codigo:CodigoRol,
        public readonly nombre:String,
        public readonly permisos:Permiso[]
    ){}
}