"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaCliente = void 0;
const mongoose_1 = require("mongoose");
exports.SchemaCliente = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    direccion: { type: String, required: true },
    password: { type: String, required: true },
    metodoPago: { type: String, enum: ['Tarjeta', 'Metalico'], required: true }
});
