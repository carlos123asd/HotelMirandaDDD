"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rol = void 0;
const Permiso_1 = require("./Permiso");
class Rol {
    constructor(codigo, nombre, permisos) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.permisos = permisos;
    }
    static fromString(value) {
        switch (value) {
            case Rol.ADMIN.codigo: return Rol.ADMIN;
            case Rol.STAFF.codigo: return Rol.STAFF;
            default: throw new Error(`Rol invalido: ${value}`);
        }
    }
}
exports.Rol = Rol;
Rol.ADMIN = new Rol('admin', 'Administrador', [
    new Permiso_1.Permiso("ADM", 3, "Rol Administrador con todos los permisos del Sistema")
]);
Rol.STAFF = new Rol('staff', 'Personal', [
    new Permiso_1.Permiso("GR", 3, "Rol Empleado con los permisos basicos del Sistema para gestionar reservas")
]);
