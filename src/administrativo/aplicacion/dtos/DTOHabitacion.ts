import { categoriaHabitacion } from "../../dominio/agregados/Habitacion"
import { Servicios } from "../../dominio/value-objects/Servicios"

export type DTOHabitacion = {
    id:string,
    nombre:string,
    descripcion:string,
    precio:number,
    oferta:number,
    categoria:categoriaHabitacion,
    servicios:Servicios[],
    imagenes:string[],
    piso:string,
}