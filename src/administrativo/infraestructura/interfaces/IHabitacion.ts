export type categoriaHabitacion = 'Habitacion Simple' | 'Doble Habitacion' | 'Suite'

export interface Servicios {
    nombre:string,
    precio:number
}
export default interface IHabitacion {
    _id:string,
    nombre:string,
    descripcion:string,
    precio:number,
    oferta:number,
    categoria:categoriaHabitacion,
    servicios:Servicios[],
    imagenes:string[],
    piso:string,
    codigo:string
}