import { IReservaRepo } from "../../dominio/repositorios/IReservaRepo";
import { DTOReserva } from "../dtos/DTOReserva";

export class EliminarReserva{
    constructor(
        private readonly reservaRepo:IReservaRepo
    ){}

    async ejecutar(dto:DTOReserva):Promise<void>{
        const existeReserva = dto.id ? await this.reservaRepo.buscarPorID(dto.id) : null
        if(!existeReserva){
             throw new Error("Reserva no encontrada");
        }
        await this.reservaRepo.eliminar(String(existeReserva.id))
    }
}