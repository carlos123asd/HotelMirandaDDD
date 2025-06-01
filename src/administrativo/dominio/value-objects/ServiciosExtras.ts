import { Servicios } from "./Servicios";

export class ServiciosExtras extends Servicios{
    constructor(
        public readonly nombre: string,
        public readonly precio: number
    ) {
        super(nombre, precio);
    }
}