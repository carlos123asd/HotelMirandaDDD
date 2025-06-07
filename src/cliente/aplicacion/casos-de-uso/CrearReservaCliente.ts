import { ReservaCliente } from "../../dominio/agregados/ReservaCliente";
import { ReservaClienteRepo } from "../../dominio/repositorios/ReservaClienteRepo";
import { DTOReservaCliente } from "../dtos/DTOReservaCliente";

export class CrearReservaCliente{
    constructor(
        private readonly reservaRepo:ReservaClienteRepo
    ){}

    async ejecutar(dtoReserva:DTOReservaCliente):Promise<void>{
        const reservaEncontrada = await this.reservaRepo.buscarPorId(dtoReserva.id)
        if(reservaEncontrada){
            throw new Error("Ya existe una reserva con este ID")
        }
        const nuevaReserva = ReservaCliente.crearDesdeDTO(dtoReserva)
        await this.reservaRepo.guardar(nuevaReserva)
    }
}