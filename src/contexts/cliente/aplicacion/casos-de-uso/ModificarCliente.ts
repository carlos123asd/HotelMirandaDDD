import { IClienteRepo } from "../../dominio/repositorios/IClienteRepo";
import { DTOCliente } from "../dtos/DTOCliente";

export class ModificaCliente{
    constructor(
        private readonly clienteRepo:IClienteRepo
    ){}

    async ejecutar(dtoCliente:DTOCliente):Promise<void>{
        const cliente = await this.clienteRepo.buscarPorEmail(dtoCliente.email);
        if(!cliente){
            throw new Error("No se encontro a ningun cliente con este correo")
        }
        cliente.modificarDesdeDTO(dtoCliente)
        await this.clienteRepo.guardar(cliente)
    }
}