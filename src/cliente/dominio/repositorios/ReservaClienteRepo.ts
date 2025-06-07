import { ReservaCliente } from "../agregados/ReservaCliente";

export interface ReservaClienteRepo {
    guardar(reservaCliente:ReservaCliente):Promise<void>
    eliminar(id:string):Promise<void>
    buscarPorId(id:string):Promise<ReservaCliente | null>
}