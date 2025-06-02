import { DTOHabitacion } from "../../aplicacion/dtos/DTOHabitacion";
import { ImagenesHabitacion } from "../value-objects/ImagenesHabitacion";
import { Servicios } from "../value-objects/Servicios";

export type categoriaHabitacion = 'Habitacion Simple' | 'Doble Habitacion' | 'Suite'

export class Habitacion{
    constructor(
        public readonly id:String,
        public nombre:String,
        public descripcion:String,
        public precio:number,
        public oferta:number,
        public categoria:categoriaHabitacion,
        public servicios:Servicios[],
        public imagenes:ImagenesHabitacion[],
        public readonly piso:String,
        public readonly codigo:String
    ){}

    static crearDesdeDTO(dto:DTOHabitacion,codigo:String){
        return new Habitacion(
            dto.id,
            dto.nombre,
            dto.descripcion,
            dto.precio,
            dto.oferta,
            dto.categoria,
            dto.servicios,
            dto.imagenes,
            dto.piso,
            codigo
        )
    }

    modificarDesdeDTO(dto:DTOHabitacion){
        if(dto.id !== this.id || dto.piso !== this.piso){
            throw new Error("El id y el piso de una Habitacion no se pueden modificar")
        }
        this.nombre=dto.nombre
        this.descripcion=dto.descripcion
        this.precio=dto.precio
        this.oferta=dto.oferta
        this.categoria=dto.categoria
        this.servicios=dto.servicios
        this.imagenes=dto.imagenes
    }
}