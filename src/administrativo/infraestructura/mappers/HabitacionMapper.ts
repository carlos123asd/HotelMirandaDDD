import { HydratedDocument } from "mongoose";
import { Habitacion } from "../../dominio/agregados/Habitacion";
import IHabitacion from "../interfaces/IHabitacion";
import { MHabitacion } from "../models/HabitacionModelo";

export class HabitacionMapper{
    static desdeDocumento(doc:HydratedDocument<IHabitacion>):Habitacion{
        return Habitacion.crearDesdePersistencia({
            id:doc._id.toString(),
            nombre:doc.nombre,
            descripcion:doc.descripcion,
            precio:doc.precio,
            oferta:doc.oferta,
            categoria:doc.categoria,
            servicios:doc.servicios,
            imagenes:doc.imagenes,
            piso:doc.piso,
            codigo:doc.codigo
        })
    }

    static arrayDocumento(doc:HydratedDocument<IHabitacion>[]):Habitacion[]{
        return doc.map((habitacion:HydratedDocument<IHabitacion>) => this.desdeDocumento(habitacion)) 
    }

    static aDocumento(dto:Habitacion){
        const doc:Partial<IHabitacion> = {
            _id: dto.id.toString(),
            nombre: dto.nombre,
            descripcion: dto.descripcion,
            precio: dto.precio,
            oferta: dto.oferta,
            categoria: dto.categoria,
            servicios: dto.servicios,
            imagenes: dto.imagenes,
            piso: dto.piso,
            codigo: dto.codigo
        }
        return new MHabitacion(doc)
    }
}