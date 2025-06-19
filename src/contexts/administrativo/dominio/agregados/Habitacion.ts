import { DTOHabitacion } from "../../aplicacion/dtos/DTOHabitacion";
import { Servicios } from "../value-objects/Servicios";

export enum categoriaHabitacion {
    'Habitacion Simple' = 'Habitacion Simple' ,
    'Doble Habitacion' = 'Doble Habitacion' ,
    Suite = 'Suite',
    Deluxe = 'Deluxe',
    Familiar = 'Familiar',
    Presidencial = 'Presidencial'
}

export class Habitacion{
    constructor(
        public readonly id:string,
        public nombre:string,
        public descripcion:string,
        public precio:number,
        public oferta:number,
        public categoria:categoriaHabitacion,
        public servicios:Servicios[],
        public imagenes:string[],
        public readonly piso:string,
        public readonly codigo:string
    ){}

    static crearDesdePersistencia(params:{
        id:string,
        nombre:string,
        descripcion:string,
        precio:number,
        oferta:number,
        categoria:string,
        servicios:Servicios[],
        imagenes:string[],
        piso:string,
        codigo:string
    }):Habitacion{
        if(!Object.values(categoriaHabitacion).includes(params.categoria as categoriaHabitacion)){
            throw new Error("Categoria de habitacion invalida")
        }
        return new Habitacion(
            params.id,
            params.nombre,
            params.descripcion,
            params.precio,
            params.oferta,
            params.categoria as categoriaHabitacion,
            params.servicios,
            params.imagenes,
            params.piso,
            params.codigo
        )
    }

    static crearDesdeDTO(dto:DTOHabitacion,codigo:string){
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
        //id y piso no se modifica
        this.nombre=dto.nombre
        this.descripcion=dto.descripcion
        this.precio=dto.precio
        this.oferta=dto.oferta
        this.categoria=dto.categoria
        this.servicios=dto.servicios
        this.imagenes=dto.imagenes
    }
}