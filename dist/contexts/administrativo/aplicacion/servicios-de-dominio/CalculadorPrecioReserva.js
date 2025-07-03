"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculadorPrecioReserva = void 0;
//RecargoDiaEspecial -> Fin de semana,Festivos...
class CalculadorPrecioReserva {
    constructor(precioBase, extras, recargoDiaEspecial = 0, oferta = 0) {
        this.precioBase = precioBase;
        this.extras = extras;
        this.recargoDiaEspecial = recargoDiaEspecial;
        this.oferta = oferta;
    }
    calcular() {
        const precioExtra = this.extras?.reduce((sumTotal, servicio) => sumTotal + servicio.precio, 0);
        const porcentajeOfertaAplicado = this.oferta > 0 ? (this.oferta * this.precioBase) / 100 : 0;
        return ((this.precioBase + (precioExtra ? precioExtra : 0) + this.recargoDiaEspecial) - porcentajeOfertaAplicado);
    }
}
exports.CalculadorPrecioReserva = CalculadorPrecioReserva;
