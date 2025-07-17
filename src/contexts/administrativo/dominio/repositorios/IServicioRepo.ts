import { Servicio } from "../agregados/Servicio";

export interface IServicioRepo {
    guardar(extra:Servicio):Promise<void>;
    obtenerPorId(id:string):Promise<Servicio|null>;
    obtenerTodos():Promise<Servicio[]>;
    eliminar(id:string):Promise<void>;
}