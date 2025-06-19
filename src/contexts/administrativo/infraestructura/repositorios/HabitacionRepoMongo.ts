import { FiltroHabitacionesDTO } from "../../aplicacion/dtos/DTOFiltroHabitaciones";
import { Habitacion } from "../../dominio/agregados/Habitacion";
import { IHabitacionRepo } from "../../dominio/repositorios/IHabitacionRepo";
import { HabitacionMapper } from "../mappers/HabitacionMapper";
import { MHabitacion } from "../models/HabitacionModelo";

export class HabitacionRepoMongo implements IHabitacionRepo{
    async ContarHabitaciones(): Promise<number> {
        try {
            const numHabitaciones = await MHabitacion.countDocuments({});
            return numHabitaciones;
        } catch (err) {
            throw new Error(`Error al contar habitaciones: ${err}`);
        }
    }

    async buscarConFiltros(filtros:FiltroHabitacionesDTO): Promise<Habitacion[] | null> {
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
        const docs = await MHabitacion.find(query)
        if(!docs){
            return null
        }
        return HabitacionMapper.arrayDocumento(docs)
    }
   
    async guardar(habitacion: Habitacion, modificar:boolean): Promise<void> {
        const doc = HabitacionMapper.aDocumento(habitacion)
        if(modificar){
           await MHabitacion.findByIdAndUpdate(doc._id,doc,{ upsert:true, new:true })
        }else{
            await doc.save()
        }
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
    async todasLasHabitaciones(): Promise<Habitacion[] | null> {
        const doc = await MHabitacion.find();
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