"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CalculadorPrecioReserva_1 = require("../../../../contexts/administrativo/aplicacion/servicios-de-dominio/CalculadorPrecioReserva");
const ServiciosExtras_1 = require("../../../../contexts/administrativo/dominio/value-objects/ServiciosExtras");
describe("calcular Precio de la Reserva", () => {
    it("calcular el precio total de la reserva sin extras y con recargo y precio base", () => {
        const calculo = new CalculadorPrecioReserva_1.CalculadorPrecioReserva(120, [], 10, 5).calcular();
        expect(calculo).toBe(124);
    });
    it("calcular el precio total de la reserva con extras y con recargo y precio base", () => {
        const calculo = new CalculadorPrecioReserva_1.CalculadorPrecioReserva(120, [ServiciosExtras_1.ServiciosExtras.BUFFET, ServiciosExtras_1.ServiciosExtras.GIMNASIO], 10, 5).calcular();
        expect(calculo).toBe(141);
    });
});
