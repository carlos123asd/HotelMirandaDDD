import { StatusType } from "../../dominio/agregados/Empleado";
import { Permiso } from "../../dominio/value-objects/Permiso";
import { Rol } from "../../dominio/value-objects/Rol";

export type DTOEmpleado = {
    id:string;
    email:string;
    photo:string;
    startDate:Date;
    telefono:string;
    codigo?:string | null;
    nombre:string;
    password:string;
    rol:Rol;
    permisosExtra?:Permiso[] | null;
    status:StatusType;
}