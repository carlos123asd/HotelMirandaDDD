import { Permiso } from "../../dominio/value-objects/Permiso";
import { Rol } from "../../dominio/value-objects/Rol";

export type DTOEmpleado = {
    id:string;
    email:string;
    codigo:string;
    nombre:string;
    password:string;
    rol:Rol;
    permisosExtra?:Permiso[];
}