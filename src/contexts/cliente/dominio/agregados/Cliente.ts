import { DTOCliente } from "../../aplicacion/dtos/DTOCliente";

export enum metodoPago {
    Tarjeta = 'Tarjeta' , 
    Metalico = 'Metalico'}

export class Cliente{
    constructor(
        public readonly id:string,
        public nombre:string,
        public email:string,
        public direccion:string,
        public password:string,
        public metodoPago:metodoPago
    ){}

    static crearDesdePersistencia(params:{
        id:string,
        nombre:string,
        email:string,
        direccion:string,
        password:string,
        metodoPago:string
    }):Cliente{
        if(!Object.values(metodoPago).includes(params.metodoPago as metodoPago)){
            throw new Error("Metodo de pago invalido")
        }
        return new Cliente(
            params.id,
            params.nombre,
            params.email,
            params.direccion,
            params.password,
            params.metodoPago as metodoPago
        )
    }

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