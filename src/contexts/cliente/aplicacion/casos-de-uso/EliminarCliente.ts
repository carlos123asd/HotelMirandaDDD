import { IClienteRepo } from "../../dominio/repositorios/IClienteRepo";
import { DTOCliente } from "../dtos/DTOCliente";

export class EliminarCliente{
    constructor(
        private readonly clienteRepo:IClienteRepo
    ){}

    async ejecutar(idCliente:DTOCliente):Promise<void>{
        if(!idCliente.id){
            throw new Error("No existe ID cliente")
        }
        const doc = await this.clienteRepo.buscarPorId(idCliente.id)
        if(!doc){
            throw new Error("No se encontro ningun Cliente con este ID para su eliminacion")
        }
        await this.clienteRepo.eliminar(idCliente.id)
    }
}