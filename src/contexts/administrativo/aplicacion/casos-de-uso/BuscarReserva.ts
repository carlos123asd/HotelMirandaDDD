import { ReservaAdministrativa } from "../../dominio/agregados/ReservaAdministrativa";
import { IReservaRepo } from "../../dominio/repositorios/IReservaRepo";

export class BuscarReserva{
    constructor(
        private readonly reservaRepo:IReservaRepo
    ){}

    async buscarPorId(reservaId:string):Promise<ReservaAdministrativa>{
        const reserva = await this.reservaRepo.buscarPorID(reservaId)
        if(!reserva){
            throw new Error("No se encontro ninguna Reserva con este ID")
        }
        return reserva
    }

     async buscarPorCliente(clienteId:string):Promise<ReservaAdministrativa[]>{
        const reservas = await this.reservaRepo.buscarPorCliente(clienteId)
        if(!reservas){
            throw new Error("No se encontro ninguna Reserva para este Cliente")
        }
        return reservas
    }

    async buscarPorHabitacion(habitacionId:string):Promise<ReservaAdministrativa[]>{
        const reservas = await this.reservaRepo.buscarPorHabitacion(habitacionId)
        if(!reservas){
            throw new Error("No se encontro Reservas para esta habitacion")
        }
        return reservas
    }
}