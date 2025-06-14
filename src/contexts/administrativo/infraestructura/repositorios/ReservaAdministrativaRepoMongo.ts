import { IClienteRepo } from "../../../cliente/dominio/repositorios/IClienteRepo";
import { ReservaAdministrativa } from "../../dominio/agregados/ReservaAdministrativa";
import { IEmpleadoRepo } from "../../dominio/repositorios/IEmpleadoRepo";
import { IHabitacionRepo } from "../../dominio/repositorios/IHabitacionRepo";
import { INotasInternasRepo } from "../../dominio/repositorios/INotasInternasRepo";
import { IReservaRepo } from "../../dominio/repositorios/IReservaRepo";
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
        const doc = ReservaAdministrativaMapper.aDocumento(reserva)
        await doc.save()
    }
    async eliminar(id: String): Promise<void> {
        const doc = await MReservaAdministrativa.findById(id)
        if(!doc){
            throw new Error("No se encontro ninguna reserva con este ID para su eliminacion")
        }
        if(doc.estado === "cancelada"){
            const result = await MReservaAdministrativa.deleteOne({ _id:id })
            if(result.deletedCount === 0){
                throw new Error("No se pudo eliminar esta reserva")
            }
        }else{
            throw new Error("La reseva no se puede eliminar porque ya esta aceptada o en curso")
        }
    }
   
}