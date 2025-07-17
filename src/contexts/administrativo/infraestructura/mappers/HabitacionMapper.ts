import { HydratedDocument } from "mongoose";
import { Habitacion } from "../../dominio/agregados/Habitacion";
import IHabitacion from "../interfaces/IHabitacion";
import { MHabitacion } from "../models/HabitacionModelo";
import { IServicioRepo } from "../../dominio/repositorios/IServicioRepo";

export class HabitacionMapper{

    static async desdeDocumento(deps:{
        servicioRepo:IServicioRepo
    },doc:HydratedDocument<IHabitacion>): Promise<Habitacion> {
        const servicios = [];
        for (const servicioRef of doc.servicios) {
            const servicio = await deps.servicioRepo.obtenerPorId(servicioRef);
            if (!servicio) {
                throw new Error(`Servicio no encontrado: ${servicioRef}`);
            }
            servicios.push(servicio);
        }
        return Habitacion.crearDesdePersistencia({
            id:doc._id,
            nombre:doc.nombre,
            descripcion:doc.descripcion,
            precio:doc.precio,
            oferta:doc.oferta,
            categoria:doc.categoria,
            servicios:servicios,
            imagenes:doc.imagenes,
            piso:doc.piso,
            codigo:doc.codigo
        })
    }
    static async arrayDocumento(deps: { servicioRepo: IServicioRepo }, doc:HydratedDocument<IHabitacion>[]): Promise<Habitacion[]> {
        return Promise.all(doc.map((habitacion:HydratedDocument<IHabitacion>) => this.desdeDocumento(deps, habitacion)));
    }

    static aDocumento(dto: Habitacion) {
        const doc: Partial<IHabitacion> = {
            _id: dto.id,
            nombre: dto.nombre,
            descripcion: dto.descripcion,
            precio: dto.precio,
            oferta: dto.oferta,
            categoria: dto.categoria,
            servicios: dto.servicios.map(servicio => servicio.id),
            imagenes: dto.imagenes,
            piso: dto.piso,
            codigo: dto.codigo
        };

        return new MHabitacion(doc);
    }
}


