import { ReservaClienteRepo } from "../../dominio/repositorios/ReservaClienteRepo";
import { DTOReservaCliente } from "../dtos/DTOReservaCliente";

export class ModificarReservaCliente{
    constructor(
        private readonly reservaRepo:ReservaClienteRepo 
    ){}

    async ejecutar(dtoReserva:DTOReservaCliente):Promise<void>{
        const reserva = await this.reservaRepo.buscarPorId(dtoReserva.id)
        if(!reserva){
            throw new Error("No se enconto ninguna reserva con este ID para modificar")
        }
        reserva.modificarDesdeDTO(dtoReserva)
        await this.reservaRepo.guardar(reserva)
    }
}