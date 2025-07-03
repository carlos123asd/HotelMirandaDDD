"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModificarReserva = void 0;
class ModificarReserva {
    constructor(reservaRepo) {
        this.reservaRepo = reservaRepo;
    }
    async ejecutar(dto) {
        const reserva = dto.id ? await this.reservaRepo.buscarPorID(dto.id) : null;
        if (!reserva) {
            throw new Error("Reserva no encontrada");
        }
        reserva.modificarDesdeDTO(dto);
        await this.reservaRepo.guardar(reserva, true);
    }
}
exports.ModificarReserva = ModificarReserva;
