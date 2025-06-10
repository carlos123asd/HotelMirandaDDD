import { FiltroHabitacionesDTO } from "../../aplicacion/dtos/DTOFiltroHabitaciones";
import { Habitacion } from "../../dominio/agregados/Habitacion";
import { IHabitacionRepo } from "../../dominio/repositorios/IHabitacionRepo";
import { HabitacionMapper } from "../mappers/HabitacionMapper";
import { MHabitacion } from "../models/HabitacionModelo";

export class HabitacionRepoMongo implements IHabitacionRepo{
    async buscarConFiltros(filtros:FiltroHabitacionesDTO, desde: number): Promise<Habitacion[] | null> {
       const query:any = {}
        if (filtros.categorias && filtros.categorias.length > 0) {
            query.categoria = { $in: filtros.categorias };
        }
        if (filtros.precioMaximo !== undefined) {
            query.precio = { $lte: filtros.precioMaximo };
        }
        if (filtros.servicios && filtros.servicios.length > 0) {
            query.servicios = { $all: filtros.servicios };
        }
        const docs = await MHabitacion.find(query).skip(desde).limit(10)
        if(!docs){
            return null
        }
        return HabitacionMapper.arrayDocumento(docs)
    }
   
    async guardar(habitacion: Habitacion): Promise<void> {
        const doc = new MHabitacion(habitacion)
        await doc.save()
    }
    async buscarPorId(id: String): Promise<Habitacion | null> {
        const doc = await MHabitacion.findById(id);
        if(!doc){
            return null
        }
        return HabitacionMapper.desdeDocumento(doc)
    }
    async buscarPorCodigo(codigo: String): Promise<Habitacion | null> {
        const doc = await MHabitacion.findOne({ codigo: codigo })
        if(!doc){
            return null
        }
        return HabitacionMapper.desdeDocumento(doc)
    }
    async todasLasHabitaciones(desde:number): Promise<Habitacion[] | null> {
        const doc = await MHabitacion.find().skip(desde).limit(10);
        if(!doc){
            return null
        }
        return HabitacionMapper.arrayDocumento(doc)
    }
    
    async eliminar(id: String): Promise<void> {
        try {
            const result = await MHabitacion.deleteOne({ _id: id })
            if(result.deletedCount === 0){
                throw new Error(`No se elimino ninguna habitacion con id: ${id}`)
            }
        } catch (error) {
            throw new Error("Error al eliminar una habitacion")
        }
    }
   
}