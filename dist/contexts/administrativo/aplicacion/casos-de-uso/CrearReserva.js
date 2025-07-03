"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearReserva = void 0;
const Reserva_1 = require("../../dominio/agregados/Reserva");
const CalculadorPrecioReserva_1 = require("../servicios-de-dominio/CalculadorPrecioReserva");
class CrearReserva {
    constructor(reservaRepo) {
        this.reservaRepo = reservaRepo;
    }
    async ejecutar(nuevoReservaDTO, recargo) {
        const existeReserva = nuevoReservaDTO.id ?
            await this.reservaRepo.buscarPorID(nuevoReservaDTO.id) : null;
        if (existeReserva) {
            throw new Error("Ya existe un reserva con esta id");
        }
        const totalReserva = new CalculadorPrecioReserva_1.CalculadorPrecioReserva(nuevoReservaDTO.habitacion.precio, nuevoReservaDTO.extras, recargo, nuevoReservaDTO.habitacion.oferta).calcular();
        const nuevaReserva = Reserva_1.Reserva.crearDesdeDTO(nuevoReservaDTO, totalReserva);
        await this.reservaRepo.guardar(nuevaReserva, false);
    }
}
exports.CrearReserva = CrearReserva;
