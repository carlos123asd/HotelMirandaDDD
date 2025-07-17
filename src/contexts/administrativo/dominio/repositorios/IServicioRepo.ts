import { Servicio } from "../agregados/Servicio";

export interface IServicioRepo {
    guardar(extra:Servicio, modificar:boolean):Promise<void>;
    obtenerPorId(id:string):Promise<Servicio|null>;
    obtenerTodos():Promise<Servicio[]|null>;
    eliminar(id:string):Promise<void>;
}