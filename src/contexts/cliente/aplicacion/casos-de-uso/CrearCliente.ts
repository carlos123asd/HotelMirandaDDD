import { Cliente } from "../../dominio/agregados/Cliente";
import { IClienteRepo } from "../../dominio/repositorios/IClienteRepo";
import { DTOCliente } from "../dtos/DTOCliente";

export class CrearCliente{
    constructor(
        private readonly clienteRepo:IClienteRepo
    ){}

    async ejecutar(dtoCliente:DTOCliente):Promise<void>{
        const nuevoCliente = Cliente.crearDesdeDTO(dtoCliente)
        const existeCliente = await this.clienteRepo.buscarPorEmail(nuevoCliente.email)
        if(existeCliente){
            throw new Error("Ya existe un cliente con este correo")
        }
        await this.clienteRepo.guardar(nuevoCliente,false)
    }
}