import { IClienteRepo } from "../../../cliente/dominio/repositorios/IClienteRepo";
import { Reserva } from "../../dominio/agregados/Reserva";
import { IEmpleadoRepo } from "../../dominio/repositorios/IEmpleadoRepo";
import { IHabitacionRepo } from "../../dominio/repositorios/IHabitacionRepo";
import { INotasInternasRepo } from "../../dominio/repositorios/INotasInternasRepo";
import { IReservaRepo } from "../../dominio/repositorios/IReservaRepo";
import { ReservaMapper } from "../mappers/ReservaMapper";
import { MReserva } from "../models/Reserva";

export class ReservaRepoMongo implements IReservaRepo{
    private notasInternasRepo?:INotasInternasRepo

    constructor(
        private readonly clienteRepo:IClienteRepo,
        private readonly habitacionRepo:IHabitacionRepo,
        private readonly empleadoRepo:IEmpleadoRepo,
    ){}

    setNotasInternasRepo(repo: INotasInternasRepo) {
        this.notasInternasRepo = repo;
    }

     async buscarTodasReservas(): Promise<Reserva[] | null> {
        const docs = await MReserva.find()
        if(!docs){
            return null
        }
        if (!this.notasInternasRepo) {
            throw new Error("notasInternasRepo is not set");
        }
        return ReservaMapper.desdeDocumentoArray({
            clienteRepo:this.clienteRepo,
            habitacionRepo:this.habitacionRepo,
            empleadoRepo:this.empleadoRepo,
            notasInternasRepo:this.notasInternasRepo
        },docs)
    }

    async buscarPorID(id: string): Promise<Reserva | null> {
        const doc = await MReserva.findById(id)
        if(!doc){
            return null
        }
        if (!this.notasInternasRepo) {
            throw new Error("notasInternasRepo is not set");
        }

        return ReservaMapper.desdeDocumento({
            clienteRepo:this.clienteRepo,
            habitacionRepo:this.habitacionRepo,
            empleadoRepo:this.empleadoRepo,
            notasInternasRepo:this.notasInternasRepo
        },doc)
    }

    async buscarPorCliente(idCliente: string): Promise<Reserva[] | null> {
        const docs = await MReserva.find({ idCliente:idCliente })
        if (!this.notasInternasRepo) {
            throw new Error("notasInternasRepo is not set");
        }
        return ReservaMapper.desdeDocumentoArray({
            clienteRepo:this.clienteRepo,
            habitacionRepo:this.habitacionRepo,
            empleadoRepo:this.empleadoRepo,
            notasInternasRepo:this.notasInternasRepo
        },docs)
    }
    async buscarPorHabitacion(idHabitacion: string): Promise<Reserva[] | null> {
        const docs = await MReserva.find({ idHabitacion:idHabitacion })
        if(!docs){
            return null
        }
        if (!this.notasInternasRepo) {
            throw new Error("notasInternasRepo is not set");
        }
         return ReservaMapper.desdeDocumentoArray({
            clienteRepo:this.clienteRepo,
            habitacionRepo:this.habitacionRepo,
            empleadoRepo:this.empleadoRepo,
            notasInternasRepo:this.notasInternasRepo
        },docs)
    }
    async guardar(reserva: Reserva, modificar:boolean): Promise<void> {
        const doc = ReservaMapper.aDocumento(reserva)
        if(modificar){
            await MReserva.findByIdAndUpdate(doc._id,doc,{ upsert:true, new:true })
        }else{
            await doc.save()
        }
    }
    async eliminar(id: String): Promise<void> {
        const doc = await MReserva.findById(id)
        if(!doc){
            throw new Error("No se encontro ninguna reserva con este ID para su eliminacion")
        }
        if(doc.estado === "cancelada"){
            const result = await MReserva.deleteOne({ _id:id })
            if(result.deletedCount === 0){
                throw new Error("No se pudo eliminar esta reserva")
            }
        }else{
            throw new Error("La reseva no se puede eliminar porque ya esta aceptada o en curso, si esta pendiente primero puedes cancelar la reserva")
        }
    }
   
}