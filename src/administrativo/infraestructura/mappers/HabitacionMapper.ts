import { Habitacion } from "../../dominio/agregados/Habitacion";

export class HabitacionMapper{
    static desdeDocumento(doc:any):Habitacion{
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
    static arrayDocumento(doc:any):Habitacion[]{
        return doc.map((habitacion:any) => {
            return new Habitacion(
                habitacion._id.toString(),
                habitacion.nombre,
                habitacion.descripcion,
                habitacion.precio,
                habitacion.oferta,
                habitacion.categoria,
                habitacion.servicios,
                habitacion.imagenes,
                habitacion.piso,
                habitacion.codigo
            )
        }) 
    }
}