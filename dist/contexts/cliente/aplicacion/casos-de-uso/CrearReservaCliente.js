"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearReservaCliente = void 0;
const CalculadorPrecioReserva_1 = require("../../../administrativo/aplicacion/servicios-de-dominio/CalculadorPrecioReserva");
const Reserva_1 = require("../../../administrativo/dominio/agregados/Reserva");
class CrearReservaCliente {
    constructor(reservaRepo) {
        this.reservaRepo = reservaRepo;
    }
    async ejecutar(dtoReserva, recargo) {
        if (!dtoReserva.id) {
            throw new Error("El ID de la reserva es requerido");
        }
        const reservaEncontrada = await this.reservaRepo.buscarPorID(dtoReserva.id);
        if (reservaEncontrada) {
            throw new Error("Ya existe una reserva con este ID");
        }
        const totalReserva = new CalculadorPrecioReserva_1.CalculadorPrecioReserva(dtoReserva.habitacion.precio, dtoReserva.extras, recargo, dtoReserva.habitacion.oferta).calcular();
        const nuevaReserva = Reserva_1.Reserva.crearDesdeDTO(dtoReserva, totalReserva);
        await this.reservaRepo.guardar(nuevaReserva, false);
    }
}
exports.CrearReservaCliente = CrearReservaCliente;
