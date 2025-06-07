import { Cliente } from "../agregados/Cliente";

export interface ClienteRepo {
    guardar(cliente:Cliente):Promise<void>
    eliminar(id:string):Promise<void>
    buscarPorId(id:string):Promise<Cliente | null>
    buscarPorEmail(email:string):Promise<Cliente | null>
}