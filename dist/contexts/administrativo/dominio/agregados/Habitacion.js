"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Habitacion = exports.categoriaHabitacion = void 0;
var categoriaHabitacion;
(function (categoriaHabitacion) {
    categoriaHabitacion["Habitacion Simple"] = "Habitacion Simple";
    categoriaHabitacion["Doble Habitacion"] = "Doble Habitacion";
    categoriaHabitacion["Suite"] = "Suite";
    categoriaHabitacion["Deluxe"] = "Deluxe";
    categoriaHabitacion["Familiar"] = "Familiar";
    categoriaHabitacion["Presidencial"] = "Presidencial";
})(categoriaHabitacion || (exports.categoriaHabitacion = categoriaHabitacion = {}));
class Habitacion {
    constructor(id, nombre, descripcion, precio, oferta, categoria, servicios, imagenes, piso, codigo) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.oferta = oferta;
        this.categoria = categoria;
        this.servicios = servicios;
        this.imagenes = imagenes;
        this.piso = piso;
        this.codigo = codigo;
    }
    static crearDesdePersistencia(params) {
        if (!Object.values(categoriaHabitacion).includes(params.categoria)) {
            throw new Error("Categoria de habitacion invalida");
        }
        return new Habitacion(params.id, params.nombre, params.descripcion, params.precio, params.oferta, params.categoria, params.servicios, params.imagenes, params.piso, params.codigo);
    }
    static crearDesdeDTO(dto, codigo) {
        return new Habitacion(dto.id, dto.nombre, dto.descripcion, dto.precio, dto.oferta, dto.categoria, dto.servicios, dto.imagenes, dto.piso, codigo);
    }
    modificarDesdeDTO(dto) {
        //id y piso no se modifica
        this.nombre = dto.nombre;
        this.descripcion = dto.descripcion;
        this.precio = dto.precio;
        this.oferta = dto.oferta;
        this.categoria = dto.categoria;
        this.servicios = dto.servicios;
        this.imagenes = dto.imagenes;
    }
}
exports.Habitacion = Habitacion;
