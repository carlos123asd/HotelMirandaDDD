import { HydratedDocument } from "mongoose";
import { Habitacion } from "../../dominio/agregados/Habitacion";
import IHabitacion from "../interfaces/IHabitacion";

export class HabitacionMapper{
    static desdeDocumento(doc:HydratedDocument<IHabitacion>):Habitacion{
        return new Habitacion(
            doc._id.toString(),
            doc.nombre,
            doc.descripcion,
            doc.precio,
            doc.oferta,
            doc.categoria,
            doc.servicios,
            doc.imagenes,
            doc.piso,
            doc.codigo
        )
    }
    static arrayDocumento(doc:HydratedDocument<IHabitacion>[]):Habitacion[]{
        return doc.map((habitacion:HydratedDocument<IHabitacion>) => this.desdeDocumento(habitacion)) 
    }
}