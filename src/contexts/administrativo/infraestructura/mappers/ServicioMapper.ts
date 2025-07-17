import { Servicio } from "../../dominio/agregados/Servicio";
import { IServicio } from "../interfaces/IServicio";
import { MServicio } from "../models/Servicio";

export class ServicioMapper {
    static desdeDocumento(doc: any): Servicio {
        return Servicio.crearDesdePersistencia({
            id: doc._id,
            nombre: doc.nombre,
            descripcion: doc.descripcion,
            precio: doc.precio,
            imagen: doc.imagenes
        });
    }

    static arrayDocumento(docs: any[]): Servicio[] {
        return docs.map((doc) => this.desdeDocumento(doc));
    }

    static aDocumento(dto: Servicio) {
        const doc: Partial<IServicio> = {
            _id: dto.id,
            nombre: dto.nombre,
            descripcion: dto.descripcion,
            precio: dto.precio,
            imagen: dto.imagen
        };

        return new MServicio(doc)
    }
}