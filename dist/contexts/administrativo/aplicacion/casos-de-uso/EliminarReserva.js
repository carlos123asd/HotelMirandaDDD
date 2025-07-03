"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EliminarReserva = void 0;
class EliminarReserva {
    constructor(reservaRepo) {
        this.reservaRepo = reservaRepo;
    }
    async ejecutar(dto) {
        const existeReserva = dto.id ? await this.reservaRepo.buscarPorID(dto.id) : null;
        if (!existeReserva) {
            throw new Error("Reserva no encontrada");
        }
        await this.reservaRepo.eliminar(String(existeReserva.id));
    }
}
exports.EliminarReserva = EliminarReserva;
