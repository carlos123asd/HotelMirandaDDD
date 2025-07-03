"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaEmpleado = void 0;
const mongoose_1 = require("mongoose");
const PermisoSchema = new mongoose_1.Schema({
    codigo: { type: String, enum: ['ADM', 'GR', 'GE', 'GH'], required: true },
    nivel: { type: Number, enum: [1, 2, 3], required: true },
    descripcion: { type: String, required: true }
}, { _id: false });
exports.SchemaEmpleado = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    startDate: { type: Date, required: true },
    telefono: { type: String, require: true },
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['admin', 'staff'], required: true },
    status: { type: String, enum: ['inactivo', 'activo', 'suspendido'] },
    permisosExtra: { type: [PermisoSchema], default: [] },
}, {
    timestamps: true
});
