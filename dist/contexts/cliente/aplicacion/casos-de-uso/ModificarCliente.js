"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModificaCliente = void 0;
class ModificaCliente {
    constructor(clienteRepo) {
        this.clienteRepo = clienteRepo;
    }
    async ejecutar(dtoCliente) {
        const cliente = await this.clienteRepo.buscarPorEmail(dtoCliente.email);
        if (!cliente) {
            throw new Error("No se encontro a ningun cliente con este correo");
        }
        cliente.modificarDesdeDTO(dtoCliente);
        await this.clienteRepo.guardar(cliente, true);
    }
}
exports.ModificaCliente = ModificaCliente;
