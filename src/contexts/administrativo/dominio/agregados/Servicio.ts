import { DTOServicio } from "../../aplicacion/dtos/DTOServicio"

export class Servicio{
    constructor(
        public readonly id:string,
        public nombre:string,
        public descripcion:string,
        public precio:number,
        public imagen:string,
    ){}

    static crearDesdePersistencia(params:{
        id:string,
        nombre:string,
        descripcion:string,
        precio:number,
        imagen:string
    }):Servicio{
        return new Servicio(
            params.id,
            params.nombre,
            params.descripcion,
            params.precio,
            params.imagen
        )
    }

    static crearDesdeDTO(dto:DTOServicio):Servicio{
        return new Servicio(
            dto.id,
            dto.nombre,
            dto.descripcion,
            dto.precio,
            dto.imagen
        )
    }

    modificarDesdeDTO(dto:DTOServicio):void{
        this.nombre = dto.nombre;
        this.descripcion = dto.descripcion;
        this.precio = dto.precio;
        this.imagen = dto.imagen;
    }
}