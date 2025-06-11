import { IClienteRepo } from "../../../cliente/dominio/repositorios/IClienteRepo";
import { ReservaAdministrativa, tipoReserva } from "../../dominio/agregados/ReservaAdministrativa";
import { IEmpleadoRepo } from "../../dominio/repositorios/IEmpleadoRepo";
import { IHabitacionRepo } from "../../dominio/repositorios/IHabitacionRepo";
import { INotasInternasRepo } from "../../dominio/repositorios/INotasInternasRepo";
import { IReservaRepo } from "../../dominio/repositorios/IReservaRepo";
import { Servicios } from "../../dominio/value-objects/Servicios";
import { ServiciosExtras } from "../../dominio/value-objects/ServiciosExtras";
import { ReservaAdministrativaMapper } from "../mappers/ReservaAdministrativaMapper";
import { MReservaAdministrativa } from "../models/ReservaAdministrativa";

export class ReservaAdministrativaRepoMongo implements IReservaRepo{

    constructor(
        private readonly clienteRepo:IClienteRepo,
        private readonly habitacionRepo:IHabitacionRepo,
        private readonly empleadoRepo:IEmpleadoRepo,
        private readonly notasInternasRepo:INotasInternasRepo
    ){}

    async buscarPorID(id: string): Promise<ReservaAdministrativa | null> {
        const doc = await MReservaAdministrativa.findById(id)
        if(!doc){
            return null
        }
        return ReservaAdministrativaMapper.desdeDocumento({
            clienteRepo:this.clienteRepo,
            habitacionRepo:this.habitacionRepo,
            empleadoRepo:this.empleadoRepo,
            notasInternasRepo:this.notasInternasRepo
        },doc)
    }
    async buscarPorCliente(idCliente: string): Promise<ReservaAdministrativa[] | null> {
        const docs = await MReservaAdministrativa.find({ idCliente:idCliente })
        if(!docs){
            return null
        }
        return ReservaAdministrativaMapper.desdeDocumentoArray({
            clienteRepo:this.clienteRepo,
            habitacionRepo:this.habitacionRepo,
            empleadoRepo:this.empleadoRepo,
            notasInternasRepo:this.notasInternasRepo
        },docs)
    }
    async buscarPorHabitacion(idHabitacion: string): Promise<ReservaAdministrativa[] | null> {
        const docs = await MReservaAdministrativa.find({ idHabitacion:idHabitacion })
        if(!docs){
            return null
        }
         return ReservaAdministrativaMapper.desdeDocumentoArray({
            clienteRepo:this.clienteRepo,
            habitacionRepo:this.habitacionRepo,
            empleadoRepo:this.empleadoRepo,
            notasInternasRepo:this.notasInternasRepo
        },docs)
    }
    async guardar(reserva: ReservaAdministrativa): Promise<void> {
        const doc = new MReservaAdministrativa(reserva)
        await doc.save()
    }
    async eliminar(id: String): Promise<void> {
        const result =  await MReservaAdministrativa.deleteOne({ _id:id })
        if(result.deletedCount === 0){
            throw new Error(`No se pudo eliminar ninguna Reserva con este ID: ${id}`)
        }
    }
   
}