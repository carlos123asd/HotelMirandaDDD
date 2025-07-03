"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerarCodigoEmpleado = GenerarCodigoEmpleado;
function GenerarCodigoEmpleado(email, telefono) {
    const emailPart = email.split('@')[0];
    const telefonoPart = telefono.replace(/\D/g, '').slice(-4);
    return `${emailPart}${telefonoPart}`;
}
