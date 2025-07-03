"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearCliente = void 0;
const Cliente_1 = require("../../dominio/agregados/Cliente");
class CrearCliente {
    constructor(clienteRepo) {
        this.clienteRepo = clienteRepo;
    }
    async ejecutar(dtoCliente) {
        const nuevoCliente = Cliente_1.Cliente.crearDesdeDTO(dtoCliente);
        const existeCliente = await this.clienteRepo.buscarPorEmail(nuevoCliente.email);
        if (existeCliente) {
            throw new Error("Ya existe un cliente con este correo");
        }
        await this.clienteRepo.guardar(nuevoCliente, false);
    }
}
exports.CrearCliente = CrearCliente;
