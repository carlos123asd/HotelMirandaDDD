"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModificarReservaCliente = void 0;
class ModificarReservaCliente {
    constructor(reservaRepo) {
        this.reservaRepo = reservaRepo;
    }
    async ejecutar(responsable, dtoReserva) {
        if (!responsable.puedeModificarReserva()) {
            throw new Error(`Empleado ${responsable.id} no tiene permisos para modificar reservas`);
        }
        if (!dtoReserva.id) {
            throw new Error("El ID de la reserva es requerido para modificarla");
        }
        const reserva = await this.reservaRepo.buscarPorID(dtoReserva.id);
        if (!reserva) {
            throw new Error("No se enconto ninguna reserva con este ID para modificar");
        }
        reserva.modificarDesdeDTO(dtoReserva);
        await this.reservaRepo.guardar(reserva, true);
    }
}
exports.ModificarReservaCliente = ModificarReservaCliente;
