"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitacionRepoMongo = void 0;
const HabitacionMapper_1 = require("../mappers/HabitacionMapper");
const HabitacionModelo_1 = require("../models/HabitacionModelo");
class HabitacionRepoMongo {
    async ContarHabitaciones() {
        try {
            const numHabitaciones = await HabitacionModelo_1.MHabitacion.countDocuments({});
            return numHabitaciones;
        }
        catch (err) {
            throw new Error(`Error al contar habitaciones: ${err}`);
        }
    }
    async buscarConFiltros(filtros) {
        const query = {};
        if (filtros.categorias && filtros.categorias.length > 0) {
            query.categoria = { $in: filtros.categorias };
        }
        if (filtros.precioMaximo !== undefined) {
            query.precio = { $lte: filtros.precioMaximo };
        }
        if (filtros.servicios && filtros.servicios.length > 0) {
            query.servicios = { $all: filtros.servicios };
        }
        const docs = await HabitacionModelo_1.MHabitacion.find(query);
        if (!docs) {
            return null;
        }
        return HabitacionMapper_1.HabitacionMapper.arrayDocumento(docs);
    }
    async guardar(habitacion, modificar) {
        const doc = HabitacionMapper_1.HabitacionMapper.aDocumento(habitacion);
        if (modificar) {
            await HabitacionModelo_1.MHabitacion.findByIdAndUpdate(doc._id, doc, { upsert: true, new: true });
        }
        else {
            await doc.save();
        }
    }
    async buscarPorId(id) {
        const doc = await HabitacionModelo_1.MHabitacion.findById(id);
        if (!doc) {
            return null;
        }
        return HabitacionMapper_1.HabitacionMapper.desdeDocumento(doc);
    }
    async buscarPorCodigo(codigo) {
        const doc = await HabitacionModelo_1.MHabitacion.findOne({ codigo: codigo });
        if (!doc) {
            return null;
        }
        return HabitacionMapper_1.HabitacionMapper.desdeDocumento(doc);
    }
    async todasLasHabitaciones() {
        const doc = await HabitacionModelo_1.MHabitacion.find();
        if (!doc) {
            return null;
        }
        return HabitacionMapper_1.HabitacionMapper.arrayDocumento(doc);
    }
    async eliminar(id) {
        try {
            const result = await HabitacionModelo_1.MHabitacion.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                throw new Error(`No se elimino ninguna habitacion con id: ${id}`);
            }
        }
        catch (error) {
            throw new Error("Error al eliminar una habitacion");
        }
    }
}
exports.HabitacionRepoMongo = HabitacionRepoMongo;
