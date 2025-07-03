"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuscarNotasInternas = void 0;
class BuscarNotasInternas {
    constructor(NotasInternasRepo) {
        this.NotasInternasRepo = NotasInternasRepo;
    }
    async buscarPorID(notaId) {
        const nota = await this.NotasInternasRepo.buscarId(notaId);
        if (!nota) {
            throw new Error("No se encontro ninguna Nota con este ID");
        }
        return nota;
    }
    async buscarPorHabitacion(habitacionId) {
        const notas = await this.NotasInternasRepo.buscarPorHabitacion(habitacionId);
        if (!notas) {
            throw new Error("No se encontro ninguna Nota en esta habitacion");
        }
        return notas;
    }
    async buscarPorCliente(clienteId) {
        const notas = await this.NotasInternasRepo.buscarPorCliente(clienteId);
        if (!notas) {
            throw new Error("No se encontro ninguna Nota para este cliente");
        }
        return notas;
    }
    async buscarPorReserva(reservaId) {
        const notas = await this.NotasInternasRepo.buscarPorReserva(reservaId);
        if (!notas) {
            throw new Error("No se encontro ninguna Nota en esta reserva");
        }
        return notas;
    }
    async buscarTodasLasNotas() {
        const notas = await this.NotasInternasRepo.buscarTodasLasNotas();
        if (!notas) {
            throw new Error("No hay notas que mostrar");
        }
        return notas;
    }
}
exports.BuscarNotasInternas = BuscarNotasInternas;
