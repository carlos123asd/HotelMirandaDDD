import { Cliente } from "../../../cliente/dominio/agregados/Cliente";
import { ReservaCliente } from "../../../cliente/dominio/agregados/ReservaCliente";
import { IClienteRepo } from "../../../cliente/dominio/repositorios/IClienteRepo";
import { IReservaClienteRepo } from "../../../cliente/dominio/repositorios/IReservaClienteRepo";
import { Habitacion } from "../../dominio/agregados/Habitacion";
import { NotasInternas } from "../../dominio/agregados/NotasInternas";
import { ReservaAdministrativa } from "../../dominio/agregados/ReservaAdministrativa";
import { IEmpleadoRepo } from "../../dominio/repositorios/IEmpleadoRepo";
import { IHabitacionRepo } from "../../dominio/repositorios/IHabitacionRepo";
import { INotasInternasRepo } from "../../dominio/repositorios/INotasInternasRepo";
import { IReservaRepo } from "../../dominio/repositorios/IReservaRepo";
import { NotasInternasMapper } from "../mappers/NotasInternasMapper";
import { MNotasInternas } from "../models/NotasInternas";

export class NotasInternasRepoMongo implements INotasInternasRepo{

    constructor(
        private readonly empleadoRepo:IEmpleadoRepo,
        private readonly reservaAdministrativaRepo:IReservaRepo,
        private readonly reservaClienteRepo:IReservaClienteRepo,
        private readonly habitacionRepo:IHabitacionRepo,
        private readonly clienteRepo:IClienteRepo
    ){}

    async guardar(notaInterna: NotasInternas): Promise<void> {
        const doc = new MNotasInternas(notaInterna)
        await doc.save()
    }
    async eliminar(id: string): Promise<void> {
        try{
            const result = await MNotasInternas.deleteOne({ _id: id });
            if(result.deletedCount === 0){
                throw new Error(`No se elimino ninguna Nota Interna con este ID: ${id}`)
            }
        }catch(error){
            throw new Error(`Error al eliminar Nota Interna(${id})`)
        }    
    }
    async buscarId(id: string): Promise<NotasInternas | null> {
        const doc = await MNotasInternas.findById(id)
        if(!doc){
            return null
        }
        return await NotasInternasMapper.desdeDocumento(doc, {
            empleadoRepo: this.empleadoRepo,
            clienteRepo: this.clienteRepo,
            reservaClienteRepo: this.reservaClienteRepo,
            reservaAdministrativaRepo: this.reservaAdministrativaRepo,
            habitacionRepo: this.habitacionRepo
        })
    }
    async buscarPorHabitacion(idHabitacion: string): Promise<NotasInternas | null> {
        const doc = await MNotasInternas.findOne({ idHabitacion: idHabitacion })
        if(!doc){
            return null
        }
        return await NotasInternasMapper.desdeDocumento(doc, {
            empleadoRepo: this.empleadoRepo,
            clienteRepo: this.clienteRepo,
            reservaClienteRepo: this.reservaClienteRepo,
            reservaAdministrativaRepo: this.reservaAdministrativaRepo,
            habitacionRepo: this.habitacionRepo
        })
    }
    async buscarPorCliente(idCliente: string): Promise<NotasInternas | null> {
        const doc = await MNotasInternas.findOne({ idHabitacion: idCliente })
        if(!doc){
            return null
        }
        return await NotasInternasMapper.desdeDocumento(doc, {
            empleadoRepo: this.empleadoRepo,
            clienteRepo: this.clienteRepo,
            reservaClienteRepo: this.reservaClienteRepo,
            reservaAdministrativaRepo: this.reservaAdministrativaRepo,
            habitacionRepo: this.habitacionRepo
        })
    }
    async buscarPorReserva(idReserva: string | ReservaCliente): Promise<NotasInternas | null> {
        const doc = await MNotasInternas.findOne({ idHabitacion: idReserva })
        if(!doc){
            return null
        }
        return await NotasInternasMapper.desdeDocumento(doc, {
            empleadoRepo: this.empleadoRepo,
            clienteRepo: this.clienteRepo,
            reservaClienteRepo: this.reservaClienteRepo,
            reservaAdministrativaRepo: this.reservaAdministrativaRepo,
            habitacionRepo: this.habitacionRepo
        })
    }
    
}