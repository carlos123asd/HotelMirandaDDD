"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepoMongo = void 0;
const ClienteMapper_1 = require("../mappers/ClienteMapper");
const ClienteModelo_1 = require("../models/ClienteModelo");
class ClienteRepoMongo {
    async guardar(cliente, actualizar) {
        const doc = ClienteMapper_1.ClienteMapper.aDocumento(cliente);
        if (actualizar) {
            await ClienteModelo_1.ClienteModelo.findByIdAndUpdate(doc._id, doc, { upsert: true, new: true });
        }
        else {
            await doc.save();
        }
    }
    async eliminar(id) {
        try {
            const result = await ClienteModelo_1.ClienteModelo.deleteOne({ _id: id });
            if (result.deletedCount === 0)
                throw new Error("No se elimino ningun Cliente");
        }
        catch (error) {
            throw new Error("Fallo de eliminacion de cliente");
        }
    }
    async buscarPorId(id) {
        const doc = await ClienteModelo_1.ClienteModelo.findById(id);
        if (!doc) {
            return null;
        }
        return ClienteMapper_1.ClienteMapper.desdeDocumento(doc);
    }
    async buscarPorEmail(email) {
        const doc = await ClienteModelo_1.ClienteModelo.findOne({ email: email });
        if (!doc) {
            return null;
        }
        return ClienteMapper_1.ClienteMapper.desdeDocumento(doc);
    }
}
exports.ClienteRepoMongo = ClienteRepoMongo;
