import { Cliente } from "../agregados/Cliente";

export interface IClienteRepo {
    guardar(cliente:Cliente,actualizar:boolean):Promise<void>
    eliminar(id:string):Promise<void>
    buscarPorId(id:string):Promise<Cliente | null>
    buscarPorEmail(email:string):Promise<Cliente | null>
}