import { Cliente } from "../../dominio/agregados/Cliente";
import { IClienteRepo } from "../../dominio/repositorios/IClienteRepo";

export class BuscarCliente{
    constructor(
        private readonly clienteRepo:IClienteRepo
    ){}

    async buscarPorId(idCliente:string):Promise<Cliente>{
        const cliente = await this.clienteRepo.buscarPorId(idCliente)
        if(!cliente){
            throw new Error("No se encontro cliente con este ID")
        }
        return cliente
    }

    async buscarPorEmail(email:string):Promise<Cliente>{
        const cliente = await this.clienteRepo.buscarPorEmail(email)
        if(!cliente){
            throw new Error("No se encontro cliente con este email")
        }
        return cliente
    }

     async buscarTodosClientes():Promise<Cliente[]>{
        const clientes = await this.clienteRepo.buscarTodo()
        if(!clientes){
            throw new Error("No se encontro empleados")
        }
        return clientes
    }
}