"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadoMapper = void 0;
const Empleado_1 = require("../../dominio/agregados/Empleado");
const Permiso_1 = require("../../dominio/value-objects/Permiso");
const Rol_1 = require("../../dominio/value-objects/Rol");
const EmpleadoModelo_1 = require("../models/EmpleadoModelo");
class EmpleadoMapper {
    static desdeDocumento(doc) {
        return new Empleado_1.Empleado(doc._id, doc.email, doc.photo, doc.startDate, doc.telefono, doc.codigo, doc.nombre, doc.password, Rol_1.Rol.fromString(doc.rol), this.checkStatusType(doc.status), doc.permisosExtra ? Permiso_1.Permiso.fromPrimitive(doc.permisosExtra) : null);
    }
    //Inverso de objeto dominio o agregado a Documento Mongo
    static async aDocumento(dto) {
        const doc = {
            _id: dto.id,
            email: dto.email,
            photo: dto.photo,
            startDate: dto.startDate,
            telefono: dto.telefono,
            codigo: dto.codigo,
            nombre: dto.nombre,
            password: dto.password,
            rol: dto.rol.codigo,
            status: dto.status,
            permisosExtra: dto.permisosExtra ? Permiso_1.Permiso.toPrimitive(dto.permisosExtra) : [],
        };
        return new EmpleadoModelo_1.MEmpleado(doc);
    }
    static arrayDocumento(doc) {
        return doc.map((empleado) => this.desdeDocumento(empleado));
    }
}
exports.EmpleadoMapper = EmpleadoMapper;
EmpleadoMapper.checkStatusType = (value) => {
    switch (value) {
        case 'activo': return Empleado_1.StatusType.ACTIVO;
        case 'inactivo': return Empleado_1.StatusType.INACTIVO;
        case 'suspendido': return Empleado_1.StatusType.SUSPENDIDO;
        default: throw new Error('Status inválido');
    }
};
