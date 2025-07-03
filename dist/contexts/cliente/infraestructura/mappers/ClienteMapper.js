"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteMapper = void 0;
const Cliente_1 = require("../../dominio/agregados/Cliente");
const ClienteModelo_1 = require("../models/ClienteModelo");
class ClienteMapper {
    static desdeDocumento(doc) {
        return Cliente_1.Cliente.crearDesdePersistencia({
            id: doc._id,
            nombre: doc.nombre,
            email: doc.email,
            direccion: doc.direccion,
            password: doc.password,
            metodoPago: doc.metodoPago,
        });
    }
    static aDocumento(cliente) {
        const doc = {
            _id: cliente.id ? cliente.id.toString() : undefined,
            nombre: cliente.nombre,
            email: cliente.email,
            direccion: cliente.direccion,
            password: cliente.password,
            metodoPago: cliente.metodoPago
        };
        return new ClienteModelo_1.ClienteModelo(doc);
    }
}
exports.ClienteMapper = ClienteMapper;
