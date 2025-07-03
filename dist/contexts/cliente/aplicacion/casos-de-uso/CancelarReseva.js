"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelarReserva = void 0;
class CancelarReserva {
    constructor(reservaClienteRepo) {
        this.reservaClienteRepo = reservaClienteRepo;
    }
    async ejecutar(reservaClienteDTO) {
        if (!reservaClienteDTO.id) {
            throw new Error("El ID de la reserva es requerido para cancelar");
        }
        const reserva = await this.reservaClienteRepo.buscarPorID(reservaClienteDTO.id);
        if (!reserva) {
            throw new Error("No se encontro la reserva para cancelar");
        }
        reserva.modificarDesdeDTO(reservaClienteDTO);
        await this.reservaClienteRepo.guardar(reserva, true);
    }
}
exports.CancelarReserva = CancelarReserva;
