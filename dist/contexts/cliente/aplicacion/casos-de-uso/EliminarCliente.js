"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EliminarCliente = void 0;
class EliminarCliente {
    constructor(clienteRepo) {
        this.clienteRepo = clienteRepo;
    }
    async ejecutar(idCliente) {
        if (!idCliente.id) {
            throw new Error("No existe ID cliente");
        }
        const doc = await this.clienteRepo.buscarPorId(idCliente.id);
        if (!doc) {
            throw new Error("No se encontro ningun Cliente con este ID para su eliminacion");
        }
        await this.clienteRepo.eliminar(idCliente.id);
    }
}
exports.EliminarCliente = EliminarCliente;
