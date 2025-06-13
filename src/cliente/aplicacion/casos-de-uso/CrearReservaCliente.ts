import { ReservaCliente } from "../../dominio/agregados/ReservaCliente";
import { IReservaClienteRepo } from "../../dominio/repositorios/IReservaClienteRepo";
import { DTOReservaCliente } from "../dtos/DTOReservaCliente";

export class CrearReservaCliente{
    constructor(
        private readonly reservaRepo:IReservaClienteRepo
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