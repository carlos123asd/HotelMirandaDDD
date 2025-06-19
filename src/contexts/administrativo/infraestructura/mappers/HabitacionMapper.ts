import { HydratedDocument } from "mongoose";
import { Habitacion } from "../../dominio/agregados/Habitacion";
import IHabitacion from "../interfaces/IHabitacion";
import { MHabitacion } from "../models/HabitacionModelo";
import { Servicios } from "../../dominio/value-objects/Servicios";

export class HabitacionMapper{
    private static checkServicios(value:string){
        switch(value){
            case 'restaurante': return Servicios.BUFFET
            case 'spa': return Servicios.SPA
            case 'piscina': return Servicios.PISCINA
            case 'gimnasio': return Servicios.GIMNASIO
            case 'lavanderia': return Servicios.LAVANDERIA
            case 'transporte': return Servicios.TRANSPORTE
            case 'tour': return Servicios.TOUR
            case 'TV': return Servicios.TV
            case 'WIFI': return Servicios.WIFI
            default: throw new Error("Servicio Invalido")
        }
    }

    static desdeDocumento(doc:HydratedDocument<IHabitacion>):Habitacion{
        return Habitacion.crearDesdePersistencia({
            id:doc._id.toString(),
            nombre:doc.nombre,
            descripcion:doc.descripcion,
            precio:doc.precio,
            oferta:doc.oferta,
            categoria:doc.categoria,
            servicios:doc.servicios.map((servicio) => this.checkServicios(servicio)),
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
            servicios: dto.servicios.map((servicio) => servicio.nombre),
            imagenes: dto.imagenes,
            piso: dto.piso,
            codigo: dto.codigo
        }
        return new MHabitacion(doc)
    }
}