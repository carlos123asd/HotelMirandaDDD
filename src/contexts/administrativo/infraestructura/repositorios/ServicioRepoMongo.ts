import { Servicio } from "../../dominio/agregados/Servicio";
import { IServicioRepo } from "../../dominio/repositorios/IServicioRepo";
import { ServicioMapper } from "../mappers/ServicioMapper";
import { MServicio } from "../models/Servicio";

export class ServicioRepoMongo implements IServicioRepo {

    async guardar(extra: Servicio, modificar: boolean): Promise<void> {
        const doc = ServicioMapper.aDocumento(extra)
        if (modificar) {
            await MServicio.findByIdAndUpdate(
                doc._id,
                doc,
                { new: true, upsert: true }
            )
        } else {
            await doc.save()
        }
    }
    
    async obtenerPorId(id: string): Promise<Servicio | null> {
        const doc = await MServicio.findById(id)
        if(!doc){
            return null
        }

        return ServicioMapper.desdeDocumento(doc)
    }

    async obtenerTodos(): Promise<Servicio[] | null> {
        const docs = await MServicio.find()
        if(!docs){
            return null
        }
        return ServicioMapper.arrayDocumento(docs)
    }

    async eliminar(id: string): Promise<void> {
        try{
            const doc = await MServicio.deleteOne({ _id: id });
            if (doc.deletedCount === 0) {
                throw new Error("No se pudo eliminar este servicio")
            }
        }catch(error){
            throw new Error("Error al eliminar el servicio con ID: " + id);
        }
    }
}