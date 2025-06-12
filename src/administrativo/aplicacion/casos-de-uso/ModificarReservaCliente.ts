import { IReservaClienteRepo } from "../../../cliente/dominio/repositorios/IReservaClienteRepo";
import { DTOReservaCliente } from "../../../cliente/aplicacion/dtos/DTOReservaCliente";

export class ModificarReservaCliente{
    constructor(
        private readonly reservaRepo:IReservaClienteRepo
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