import { DTOCliente } from "../../aplicacion/dtos/DTOCliente";

export type metodoPago = 'Tarjeta' | 'Metalico'

export class Cliente{
    constructor(
        public readonly id:string,
        public nombre:string,
        public email:string,
        public direccion:string,
        public password:string,
        public metodoPago:metodoPago
    ){}

    static crearDesdeDTO(dto:DTOCliente):Cliente{
        return new Cliente(
            dto.id,
            dto.nombre,
            dto.email,
            dto.direccion,
            dto.password,
            dto.metodoPago
        )
    }

    modificarDesdeDTO(dto:DTOCliente){
        if(this.id !== dto.id){
            throw new Error("ID del cliente no se puede modificar")
        }
        this.nombre=dto.nombre,
        this.email=dto.email,
        this.direccion=dto.direccion,
        this.password=dto.password,
        this.metodoPago=dto.metodoPago
    }
}