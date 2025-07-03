import { IClienteRepo } from "../../../cliente/dominio/repositorios/IClienteRepo";
import { NotasInternas } from "../../dominio/agregados/NotasInternas";
import { IEmpleadoRepo } from "../../dominio/repositorios/IEmpleadoRepo";
import { IHabitacionRepo } from "../../dominio/repositorios/IHabitacionRepo";
import { INotasInternasRepo } from "../../dominio/repositorios/INotasInternasRepo";
import { IReservaRepo } from "../../dominio/repositorios/IReservaRepo";
import { NotasInternasMapper } from "../mappers/NotasInternasMapper";
import { MNotasInternas } from "../models/NotasInternas";

export class NotasInternasRepoMongo implements INotasInternasRepo{

    constructor(
        private readonly empleadoRepo:IEmpleadoRepo,
        private readonly reservaRepo:IReservaRepo,
        private readonly habitacionRepo:IHabitacionRepo,
        private readonly clienteRepo:IClienteRepo
    ){}

    async guardar(notaInterna: NotasInternas, modificar:boolean): Promise<void> {
        const doc = NotasInternasMapper.aDocumento(notaInterna)
        if(modificar){
            await MNotasInternas.findByIdAndUpdate(doc._id,doc,{ upsert:true, new:true })
        }else{
            await doc.save()
        }
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
            reservaRepo: this.reservaRepo,
            habitacionRepo: this.habitacionRepo
        })
    }
    async buscarPorHabitacion(idHabitacion: string): Promise<NotasInternas[] | null> {
        const docs = await MNotasInternas.find({ idHabitacion: idHabitacion })
        if(!docs || docs.length === 0){
            return null
        }
        return await NotasInternasMapper.desdeDocumentoArray(docs, {
            empleadoRepo: this.empleadoRepo,
            clienteRepo: this.clienteRepo,
            reservaRepo: this.reservaRepo,
            habitacionRepo: this.habitacionRepo
        })
    }
    async buscarPorCliente(idCliente: string): Promise<NotasInternas[] | null> {
        const docs = await MNotasInternas.find({ idCliente: idCliente })
        if(!docs || docs.length === 0){
            return null
        }
        return await NotasInternasMapper.desdeDocumentoArray(docs, {
            empleadoRepo: this.empleadoRepo,
            clienteRepo: this.clienteRepo,
            reservaRepo: this.reservaRepo,
            habitacionRepo: this.habitacionRepo
        })
    }
    async buscarPorReserva(idReserva: string):Promise<NotasInternas[] | null> {
        const docs = await MNotasInternas.find({ idReserva: idReserva })
        if (!docs || docs.length === 0) {
            return null
        }
        return await NotasInternasMapper.desdeDocumentoArray(docs, {
            empleadoRepo: this.empleadoRepo,
            clienteRepo: this.clienteRepo,
            reservaRepo: this.reservaRepo,
            habitacionRepo: this.habitacionRepo
        })
    }
    async buscarTodasLasNotas():Promise<NotasInternas[] | null>{
        const docs = await MNotasInternas.find();
        if(!docs || docs.length === 0){
            return null
        }
        return await NotasInternasMapper.desdeDocumentoArray(docs,{
            empleadoRepo: this.empleadoRepo,
            clienteRepo: this.clienteRepo,
            reservaRepo: this.reservaRepo,
            habitacionRepo: this.habitacionRepo
        })
    }
}