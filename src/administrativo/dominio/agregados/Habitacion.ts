import { ImagenesHabitacion } from "../value-objects/ImagenesHabitacion";
import { Servicios } from "../value-objects/Servicios";

export type categoriaHabitacion = 'Habitacion Simple' | 'Doble Habitacion' | 'Suite'

export class Habitacion{
    constructor(
        public readonly id:string,
        public readonly nombre:string,
        public readonly descripcion:string,
        public readonly precio:number,
        public readonly oferta:number,
        public readonly categoria:categoriaHabitacion,
        public readonly servicios:Servicios[],
        public readonly imagenes:ImagenesHabitacion[]
        //CODIGO HABITACION GENERARLO
    ){}

    estaDisponible(){

    }

    calcularPrecioTotal(){
        
    }
}