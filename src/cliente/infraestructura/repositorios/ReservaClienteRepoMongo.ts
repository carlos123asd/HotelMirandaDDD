import { IHabitacionRepo } from "../../../administrativo/dominio/repositorios/IHabitacionRepo";
import { ReservaCliente } from "../../dominio/agregados/ReservaCliente";
import { IClienteRepo } from "../../dominio/repositorios/IClienteRepo";
import { IReservaClienteRepo } from "../../dominio/repositorios/IReservaClienteRepo";
import { ReservaClienteMapper } from "../mappers/ReservaClienteMapper";
import { ReservaClienteModelo } from "../models/ReservaClienteModelo";

export class ReservaClienteRepoMongo implements IReservaClienteRepo{
    constructor(
        private readonly clienteRepo:IClienteRepo,
        private readonly habitacionRepo:IHabitacionRepo,
    ){}

    async guardar(reservaCliente: ReservaCliente): Promise<void> {
        const doc = new ReservaClienteModelo(reservaCliente)
        await doc.save()
    }
    async eliminar(id: string): Promise<void> {
        const doc = await ReservaClienteModelo.findById(id)
        if(!doc){
            throw new Error("No se encontro ninguna reserva con este ID para su eliminacion")
        }
        if(doc.estado === "cancelada"){
            const result = await ReservaClienteModelo.deleteOne({ _id:id })
            if(result.deletedCount === 0){
                throw new Error("No se pudo eliminar esta reserva")
            }
        }else{
            throw new Error("La reseva no se puede eliminar porque ya esta aceptada o en curso")
        }
    }
    async buscarPorId(id: string): Promise<ReservaCliente | null> {
        const doc = await ReservaClienteModelo.findById(id)
        if(!doc){
            return null
        }
        return ReservaClienteMapper.desdeDocumento({
            clienteRepo: this.clienteRepo,
            habitacionRepo: this.habitacionRepo,
        },doc)
    }
    async buscarPorCliente(idCliente: string): Promise<ReservaCliente[] | null> {
        const docs = await ReservaClienteModelo.find( {idCliente:idCliente} )
        if(!docs){
            return null
        }
        return ReservaClienteMapper.desdeDocumentoArray({
            clienteRepo: this.clienteRepo,
            habitacionRepo: this.habitacionRepo,
        },docs)
    }
}