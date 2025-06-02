import { ServiciosExtras } from "../../dominio/value-objects/ServiciosExtras";
//RecargoDiaEspecial -> Fin de semana,Festivos...
export class CalculadorPrecioReserva{
    constructor(
        private readonly precioBase:number,
        private readonly extras:ServiciosExtras[],
        private readonly recargoDiaEspecial:number=0
    ){}
    calcular():number{
        const precioExtra= this.extras.reduce((sumTotal:number,servicio:ServiciosExtras) => sumTotal + servicio.precio,0)
        return this.precioBase + precioExtra + this.recargoDiaEspecial
    }
}