"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permiso = exports.NivelPermisos = void 0;
var NivelPermisos;
(function (NivelPermisos) {
    NivelPermisos[NivelPermisos["CREAR"] = 1] = "CREAR";
    NivelPermisos[NivelPermisos["MODIFICAR"] = 2] = "MODIFICAR";
    NivelPermisos[NivelPermisos["ELIMINAR"] = 3] = "ELIMINAR";
})(NivelPermisos || (exports.NivelPermisos = NivelPermisos = {}));
class Permiso {
    constructor(codigo, nivel, descripcion) {
        this.codigo = codigo;
        this.nivel = nivel;
        this.descripcion = descripcion;
    }
    puedeCrear() {
        return this.nivel >= NivelPermisos.CREAR;
    }
    puedeModificar() {
        return this.nivel >= NivelPermisos.MODIFICAR;
    }
    puedeEliminar() {
        return this.nivel >= NivelPermisos.ELIMINAR;
    }
    equals(codigo) {
        return codigo === this.codigo;
    }
    static fromPrimitive(value) {
        if (!Array.isArray(value)) {
            throw new Error("Permisos extras inválidos");
        }
        return value.map((permiso, i) => {
            if (!permiso.codigo || !permiso.descripcion || !permiso.nivel) {
                throw new Error(`Permiso número ${i} inválido`);
            }
            return new Permiso(permiso.codigo, permiso.nivel, permiso.descripcion);
        });
    }
    static toPrimitive(permisos) {
        return permisos.map((permiso, i) => {
            if (!permiso.codigo || !permiso.descripcion || !permiso.nivel) {
                throw new Error(`Permiso número ${i} inválido`);
            }
            return {
                codigo: permiso.codigo,
                nivel: permiso.nivel,
                descripcion: permiso.descripcion
            };
        });
    }
}
exports.Permiso = Permiso;
