"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadoRepoMongo = void 0;
const EmpleadoMapper_1 = require("../mappers/EmpleadoMapper");
const EmpleadoModelo_1 = require("../models/EmpleadoModelo");
class EmpleadoRepoMongo {
    async buscarTodosEmpleado() {
        const doc = await EmpleadoModelo_1.MEmpleado.find();
        if (!doc) {
            return null;
        }
        return EmpleadoMapper_1.EmpleadoMapper.arrayDocumento(doc);
    }
    async guardar(empleado, modificar = false) {
        const doc = await EmpleadoMapper_1.EmpleadoMapper.aDocumento(empleado);
        if (modificar) {
            await EmpleadoModelo_1.MEmpleado.findByIdAndUpdate(doc._id, doc, { upsert: true, new: true });
        }
        else {
            await doc.save();
        }
    }
    async buscarPorId(id) {
        const doc = await EmpleadoModelo_1.MEmpleado.findById(id);
        if (!doc) {
            return null;
        }
        return EmpleadoMapper_1.EmpleadoMapper.desdeDocumento(doc);
    }
    async buscarPorEmail(email) {
        const doc = await EmpleadoModelo_1.MEmpleado.findOne({ email: email });
        if (!doc) {
            return null;
        }
        return EmpleadoMapper_1.EmpleadoMapper.desdeDocumento(doc);
    }
    async buscarPorCodigo(codigo) {
        const doc = await EmpleadoModelo_1.MEmpleado.findOne({ codigo: codigo });
        if (!doc) {
            return null;
        }
        return EmpleadoMapper_1.EmpleadoMapper.desdeDocumento(doc);
    }
    async eliminar(id) {
        try {
            const result = await EmpleadoModelo_1.MEmpleado.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                throw new Error(`No se elimino ningun empleado con ID: ${id}`);
            }
        }
        catch (error) {
            throw new Error(`Fallo de eliminacion para empleado ${id}}`);
        }
    }
}
exports.EmpleadoRepoMongo = EmpleadoRepoMongo;
