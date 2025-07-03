import { DTOReserva } from "../../../administrativo/aplicacion/dtos/DTOReserva"
import { IReservaRepo } from "../../../administrativo/dominio/repositorios/IReservaRepo"


export class CancelarReserva{
    constructor(
        private readonly reservaClienteRepo:IReservaRepo
    ){}

    async ejecutar(reservaClienteDTO:DTOReserva):Promise<void>{
        if (!reservaClienteDTO.id) {
            throw new Error("El ID de la reserva es requerido para cancelar");
        }
        const reserva = await this.reservaClienteRepo.buscarPorID(reservaClienteDTO.id)
        if(!reserva){
            throw new Error("No se encontro la reserva para cancelar")
        }
        reserva.modificarDesdeDTO(reservaClienteDTO)
        await this.reservaClienteRepo.guardar(reserva,true)
    }
}