"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MHabitacion = void 0;
const mongoose_1 = require("mongoose");
const SchemaHabitacion_1 = require("../schema/SchemaHabitacion");
exports.MHabitacion = (0, mongoose_1.model)('Habitacion', SchemaHabitacion_1.SchemaHabitacion);
