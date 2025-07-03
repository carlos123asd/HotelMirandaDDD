"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empleado = exports.StatusType = void 0;
const Permiso_1 = require("../value-objects/Permiso");
const Rol_1 = require("../value-objects/Rol");
var StatusType;
(function (StatusType) {
    StatusType["ACTIVO"] = "activo";
    StatusType["INACTIVO"] = "inactivo";
    StatusType["SUSPENDIDO"] = "suspendido";
})(StatusType || (exports.StatusType = StatusType = {}));
class Empleado {
    constructor(id, email, photo, startDate, telefono, codigo, nombre, password, rol, status, permisosExtra) {
        this.id = id;
        this.email = email;
        this.photo = photo;
        this.startDate = startDate;
        this.telefono = telefono;
        this.codigo = codigo;
        this.nombre = nombre;
        this.password = password;
        this.rol = rol;
        this.status = status;
        this.permisosExtra = permisosExtra;
    }
    esAdmin() {
        return this.rol === Rol_1.Rol.ADMIN;
    }
    tienePermisoGE() {
        return this.permisosExtra?.some(permiso => permiso.equals('GE'));
    }
    tienePermisoGR() {
        return this.permisosExtra?.some(permiso => permiso.equals('GR'));
    }
    tienePermisoGH() {
        return this.permisosExtra?.some(permiso => permiso.equals('GH'));
    }
    consultarNivelPermiso(nivel) {
        switch (nivel) {
            case Permiso_1.NivelPermisos.CREAR: return this.permisosExtra?.some(permiso => permiso.puedeCrear()) ?? false;
            case Permiso_1.NivelPermisos.MODIFICAR: return this.permisosExtra?.some(permiso => permiso.puedeModificar()) ?? false;
            case Permiso_1.NivelPermisos.ELIMINAR: return this.permisosExtra?.some(permiso => permiso.puedeEliminar()) ?? false;
            default: throw new Error("Nivel de Permiso incorrecto - 1,2,3");
        }
    }
    //PermisoEmpleado
    puedeDarAltaEmpleado() {
        return this.esAdmin() || (this.tienePermisoGE() && this.consultarNivelPermiso(Permiso_1.NivelPermisos.CREAR));
    }
    puedeModificarEmpleado() {
        return this.esAdmin() || (this.tienePermisoGE() && this.consultarNivelPermiso(Permiso_1.NivelPermisos.MODIFICAR));
    }
    puedeEliminarEmpleado() {
        return this.esAdmin() || (this.tienePermisoGE() && this.consultarNivelPermiso(Permiso_1.NivelPermisos.ELIMINAR));
    }
    //PermisoReserva
    puedeDarAltaReserva() {
        return this.esAdmin() || (this.tienePermisoGR() && this.consultarNivelPermiso(Permiso_1.NivelPermisos.CREAR));
    }
    puedeModificarReserva() {
        return this.esAdmin() || (this.tienePermisoGR() && this.consultarNivelPermiso(Permiso_1.NivelPermisos.MODIFICAR));
    }
    puedeEliminarReserva() {
        return this.esAdmin() || this.tienePermisoGR() && this.consultarNivelPermiso(Permiso_1.NivelPermisos.ELIMINAR);
    }
    //PermisoHabitacion
    puedeDarAltaHabitacion() {
        return this.esAdmin() || (this.tienePermisoGH() && this.consultarNivelPermiso(Permiso_1.NivelPermisos.CREAR));
    }
    puedeModificarHabitacion() {
        return this.esAdmin() || (this.tienePermisoGH() && this.consultarNivelPermiso(Permiso_1.NivelPermisos.MODIFICAR));
    }
    puedeEliminarHabitacion() {
        return this.esAdmin() || (this.tienePermisoGH() && this.consultarNivelPermiso(Permiso_1.NivelPermisos.ELIMINAR));
    }
    //Si quisieramos en el futuro formatear los campos o validar campos lo hacemos desde aqui
    static crearDesdeDTO(dto, codigoEmpleado) {
        return new Empleado(dto.id, dto.email, dto.photo, dto.startDate, dto.telefono, codigoEmpleado, dto.nombre, dto.password, dto.rol, dto.status, dto.permisosExtra ? dto.permisosExtra : null);
    }
    modificarDesdeDTO(dto) {
        if (dto.id !== this.id) {
            throw new Error("No se puede cambiar el ID empleado");
        }
        this.email = dto.email,
            this.photo = dto.photo,
            this.startDate = dto.startDate,
            this.telefono = dto.telefono,
            this.nombre = dto.nombre,
            this.password = dto.password,
            this.rol = dto.rol,
            this.status = dto.status,
            this.permisosExtra = dto.permisosExtra ? dto.permisosExtra : null;
    }
}
exports.Empleado = Empleado;
