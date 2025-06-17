import { CalculadorPrecioReserva } from "../../../../contexts/administrativo/aplicacion/servicios-de-dominio/CalculadorPrecioReserva"
import { ServiciosExtras } from "../../../../contexts/administrativo/dominio/value-objects/ServiciosExtras"

describe("calcular Precio de la Reserva", () => {
    it("calcular el precio total de la reserva sin extras y con recargo y precio base", () => {
        const calculo = new CalculadorPrecioReserva(120,[],10,5).calcular()
        expect(calculo).toBe(124)
    })
    it("calcular el precio total de la reserva con extras y con recargo y precio base", () => {
        const calculo = new CalculadorPrecioReserva(120,[ServiciosExtras.BUFFET,ServiciosExtras.GIMNASIO],10,5).calcular()
        expect(calculo).toBe(141)
    })
})