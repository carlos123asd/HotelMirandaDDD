import { categoriaHabitacion } from "../../dominio/agregados/Habitacion"
import { ImagenesHabitacion } from "../../dominio/value-objects/ImagenesHabitacion"
import { Servicios } from "../../dominio/value-objects/Servicios"

export type DTOHabitacion = {
    id:string,
    nombre:string,
    descripcion:string,
    precio:number,
    oferta:number,
    categoria:categoriaHabitacion,
    servicios:Servicios[],
    imagenes:ImagenesHabitacion[],
    piso:string,
}