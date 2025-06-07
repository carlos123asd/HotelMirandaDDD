export type metodoPago = 'Tarjeta' | 'Metalico'

export interface ICliente {
    id:string,
    nombre:string,
    email:string,
    direccion:string,
    password:string,
    metodoPago:metodoPago
}