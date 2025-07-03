"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaHabitacion = void 0;
const mongoose_1 = require("mongoose");
exports.SchemaHabitacion = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    oferta: { type: Number, required: true, max: 100 },
    categoria: { type: String, required: true },
    servicios: { type: [String], required: true },
    imagenes: { type: [String], required: true },
    piso: { type: String, required: true },
    codigo: { type: String, required: true, unique: true }
}, {
    timestamps: true
});
