"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuscarCliente = void 0;
class BuscarCliente {
    constructor(clienteRepo) {
        this.clienteRepo = clienteRepo;
    }
    async buscarPorId(idCliente) {
        const cliente = await this.clienteRepo.buscarPorId(idCliente);
        if (!cliente) {
            throw new Error("No se encontro cliente con este ID");
        }
        return cliente;
    }
    async buscarPorEmail(email) {
        const cliente = await this.clienteRepo.buscarPorEmail(email);
        if (!cliente) {
            throw new Error("No se encontro cliente con este email");
        }
        return cliente;
    }
}
exports.BuscarCliente = BuscarCliente;
