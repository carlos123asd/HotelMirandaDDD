import { Reserva } from "../../dominio/agregados/Reserva";
import { IReservaRepo } from "../../dominio/repositorios/IReservaRepo";

export class BuscarReserva{
    constructor(
        private readonly reservaRepo:IReservaRepo
    ){}

    async buscarPorId(reservaId:string):Promise<Reserva>{
        const reserva = await this.reservaRepo.buscarPorID(reservaId)
        if(!reserva){
            throw new Error("No se encontro ninguna Reserva con este ID")
        }
        return reserva
    }

    async buscarPorCliente(clienteId:string):Promise<Reserva[]>{
        const reservas = await this.reservaRepo.buscarPorCliente(clienteId)
        if(!reservas){
            throw new Error("No se encontro ninguna Reserva para este Cliente")
        }
        return reservas
    }

    async buscarPorHabitacion(habitacionId:string):Promise<Reserva[]>{
        const reservas = await this.reservaRepo.buscarPorHabitacion(habitacionId)
        if(!reservas){
            throw new Error("No se encontro Reservas para esta habitacion")
        }
        return reservas
    }

    async buscarTodasReservas():Promise<Reserva[]>{
        const reservas = await this.reservaRepo.buscarTodasReservas()
        if(!reservas){
            throw new Error("No se encontro reservas")
        }
        return reservas
    }
    
}