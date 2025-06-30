import { PermisoPrimitivo } from "../../dominio/value-objects/Permiso";

export default interface IEmpleado {
    _id?:string,
    email:string,
    photo:string,
    startDate:Date,
    telefono:string,
    codigo:string,
    nombre:string,
    password:string,
    rol:string,
    status:string
    permisosExtra:PermisoPrimitivo[],
}