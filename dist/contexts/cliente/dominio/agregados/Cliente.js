"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = exports.metodoPago = void 0;
var metodoPago;
(function (metodoPago) {
    metodoPago["Tarjeta"] = "Tarjeta";
    metodoPago["Metalico"] = "Metalico";
})(metodoPago || (exports.metodoPago = metodoPago = {}));
class Cliente {
    constructor(id, nombre, email, direccion, password, metodoPago) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.direccion = direccion;
        this.password = password;
        this.metodoPago = metodoPago;
    }
    static crearDesdePersistencia(params) {
        if (!Object.values(metodoPago).includes(params.metodoPago)) {
            throw new Error("Metodo de pago invalido");
        }
        return new Cliente(params.id, params.nombre, params.email, params.direccion, params.password, params.metodoPago);
    }
    static crearDesdeDTO(dto) {
        return new Cliente(dto.id, dto.nombre, dto.email, dto.direccion, dto.password, dto.metodoPago);
    }
    modificarDesdeDTO(dto) {
        this.nombre = dto.nombre,
            this.email = dto.email,
            this.direccion = dto.direccion,
            this.password = dto.password,
            this.metodoPago = dto.metodoPago;
    }
}
exports.Cliente = Cliente;
