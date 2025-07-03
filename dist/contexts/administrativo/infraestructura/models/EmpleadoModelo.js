"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MEmpleado = void 0;
const mongoose_1 = require("mongoose");
const SchemaEmpleado_1 = require("../schema/SchemaEmpleado");
exports.MEmpleado = (0, mongoose_1.model)('Empleado', SchemaEmpleado_1.SchemaEmpleado);
