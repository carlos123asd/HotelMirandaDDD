"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuscarReserva = void 0;
class BuscarReserva {
    constructor(reservaRepo) {
        this.reservaRepo = reservaRepo;
    }
    async buscarPorId(reservaId) {
        const reserva = await this.reservaRepo.buscarPorID(reservaId);
        if (!reserva) {
            throw new Error("No se encontro ninguna Reserva con este ID");
        }
        return reserva;
    }
    async buscarPorCliente(clienteId) {
        const reservas = await this.reservaRepo.buscarPorCliente(clienteId);
        if (!reservas) {
            throw new Error("No se encontro ninguna Reserva para este Cliente");
        }
        return reservas;
    }
    async buscarPorHabitacion(habitacionId) {
        const reservas = await this.reservaRepo.buscarPorHabitacion(habitacionId);
        if (!reservas) {
            throw new Error("No se encontro Reservas para esta habitacion");
        }
        return reservas;
    }
    async buscarTodasReservas() {
        const reservas = await this.reservaRepo.buscarTodasReservas();
        if (!reservas) {
            throw new Error("No se encontro reservas");
        }
        return reservas;
    }
}
exports.BuscarReserva = BuscarReserva;
