import { Rol } from "../value-objects/Rol";

export type EmpleadoID = string;
export type Permisos = '' 

export class Empleado{
    constructor(
        public readonly id:EmpleadoID,
        public readonly codigo:String,
        public readonly rol:Rol,
    ){}
}

const empleado:Empleado = new Empleado("1","12345",Rol.ADMIN);

