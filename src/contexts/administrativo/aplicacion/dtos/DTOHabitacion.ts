import { categoriaHabitacion } from "../../dominio/agregados/Habitacion"
import { Servicio } from "../../dominio/agregados/Servicio"

export type DTOHabitacion = {
    id:string,
    nombre:string,
    descripcion:string,
    precio:number,
    oferta:number,
    categoria:categoriaHabitacion,
    servicios:Servicio[],
    imagenes:string[],
    piso:string,
    codigo?:string | null
}