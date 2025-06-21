import { metodoPago } from "../../dominio/agregados/Cliente"

export type DTOCliente = {
    id:string | undefined,
    nombre:string,
    email:string,
    direccion:string,
    password:string,
    metodoPago:metodoPago
}