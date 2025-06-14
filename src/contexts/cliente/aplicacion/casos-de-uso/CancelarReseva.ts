import { IReservaClienteRepo } from "../../dominio/repositorios/IReservaClienteRepo";
import { DTOReservaCliente } from "../dtos/DTOReservaCliente";

export class CancelarReserva{
    constructor(
        private readonly reservaClienteRepo:IReservaClienteRepo
    ){}

    async ejecutar(reservaClienteDTO:DTOReservaCliente):Promise<void>{
        const reserva = await this.reservaClienteRepo.buscarPorId(reservaClienteDTO.id)
        if(!reserva){
            throw new Error("No se encontro la reserva para cancelar")
        }
        reserva.modificarDesdeDTO(reservaClienteDTO)
        await this.reservaClienteRepo.guardar(reserva)
    }
}