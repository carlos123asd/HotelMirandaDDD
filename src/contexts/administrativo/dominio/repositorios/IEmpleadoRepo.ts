import { Empleado } from "../agregados/Empleado";
//Los repositorias son los contratos que tiene que seguir nuestra capa de infraestructura para la comunicacion con el dominio
export interface IEmpleadoRepo {
    guardar(empleado:Empleado,modificar:boolean):Promise<void>;
    buscarPorId(id:string):Promise<Empleado | null>;
    buscarPorEmail(email:string):Promise<Empleado | null>;
    buscarPorCodigo(codigo:string):Promise<Empleado | null>;
    buscarTodosEmpleado():Promise<Empleado[] | null>;
    eliminar(id:string):Promise<void>;
}