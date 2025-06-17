import { ServiciosExtras } from "../../dominio/value-objects/ServiciosExtras";
//RecargoDiaEspecial -> Fin de semana,Festivos...
export class CalculadorPrecioReserva{
    constructor(
        private readonly precioBase:number,
        private readonly extras?:ServiciosExtras[] | null,
        private readonly recargoDiaEspecial:number = 0,
        private readonly oferta:number = 0
    ){}
    calcular():number{
        const precioExtra= this.extras?.reduce((sumTotal:number,servicio:ServiciosExtras) => sumTotal + servicio.precio,0)
        const porcentajeOfertaAplicado = this.oferta > 0 ? (this.oferta * this.precioBase) / 100 : 0
        return ((this.precioBase + (precioExtra ? precioExtra : 0) + this.recargoDiaEspecial) - porcentajeOfertaAplicado)
    }
}