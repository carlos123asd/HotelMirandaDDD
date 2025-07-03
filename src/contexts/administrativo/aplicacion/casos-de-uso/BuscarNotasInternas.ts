import { NotasInternas } from "../../dominio/agregados/NotasInternas";
import { INotasInternasRepo } from "../../dominio/repositorios/INotasInternasRepo";

export class BuscarNotasInternas{
    constructor(
        private NotasInternasRepo:INotasInternasRepo
    ){}

    async buscarPorID(notaId:string):Promise<NotasInternas>{
        const nota = await this.NotasInternasRepo.buscarId(notaId)
        if(!nota){
            throw new Error("No se encontro ninguna Nota con este ID")
        }
        return nota
    }

    async buscarPorHabitacion(habitacionId:string):Promise<NotasInternas[]>{
        const notas = await this.NotasInternasRepo.buscarPorHabitacion(habitacionId)
        if(!notas){
            throw new Error("No se encontro ninguna Nota en esta habitacion")
        }
        return notas
    }

    async buscarPorCliente(clienteId:string):Promise<NotasInternas[]>{
        const notas = await this.NotasInternasRepo.buscarPorCliente(clienteId)
        if(!notas){
            throw new Error("No se encontro ninguna Nota para este cliente")
        }
        return notas
    }

    async buscarPorReserva(reservaId:string):Promise<NotasInternas[]>{
        const notas = await this.NotasInternasRepo.buscarPorReserva(reservaId)
        if(!notas){
            throw new Error("No se encontro ninguna Nota en esta reserva")
        }
        return notas
    }

    async buscarTodasLasNotas():Promise<NotasInternas[]>{
        const notas = await this.NotasInternasRepo.buscarTodasLasNotas()
        if(!notas){
            throw new Error("No hay notas que mostrar")
        }
        return notas
    }
}