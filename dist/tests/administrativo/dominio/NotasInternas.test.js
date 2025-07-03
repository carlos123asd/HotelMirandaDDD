"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Empleado_1 = require("../../../contexts/administrativo/dominio/agregados/Empleado");
const Habitacion_1 = require("../../../contexts/administrativo/dominio/agregados/Habitacion");
const NotasInternas_1 = require("../../../contexts/administrativo/dominio/agregados/NotasInternas");
const Permiso_1 = require("../../../contexts/administrativo/dominio/value-objects/Permiso");
const Rol_1 = require("../../../contexts/administrativo/dominio/value-objects/Rol");
const Servicios_1 = require("../../../contexts/administrativo/dominio/value-objects/Servicios");
describe("Notas Internas", () => {
    it("crear desde Persistencia", () => {
        const admin = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.ADMIN, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('ADM', 3, "admin")]);
        const habitacion = new Habitacion_1.Habitacion("1", "Habitacion Deluxe", "Habitacion con vista al mar", 150, 10, Habitacion_1.categoriaHabitacion.Suite, [Servicios_1.Servicios.WIFI, Servicios_1.Servicios.BUFFET], ["image1.jpg", "image2.jpg"], "2", "D123");
        const notaInterna = NotasInternas_1.NotasInternas.crearDesdePersistencia({
            id: "1",
            responsable: admin,
            tipo: NotasInternas_1.tiposNotasInternas.Habitacion,
            fecha: new Date(),
            titulo: "Reparacion de aire acondicionado",
            descripcion: "El aire acondicionado de la habitacion 101 no funciona correctamente",
            datosAgregados: [],
            habitacion: habitacion
        });
        expect(notaInterna.id).toBe("1");
        expect(notaInterna.tipo).toBe(NotasInternas_1.tiposNotasInternas.Habitacion);
        expect(notaInterna.fecha).toBeInstanceOf(Date);
        expect(notaInterna.titulo).toBe("Reparacion de aire acondicionado");
        expect(notaInterna.descripcion).toBe("El aire acondicionado de la habitacion 101 no funciona correctamente");
        expect(notaInterna.responsable).toBe(admin);
        expect(notaInterna.habitacion).toBe(habitacion);
    });
    it("crear desde DTO", () => {
        const admin = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.ADMIN, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('ADM', 3, "admin")]);
        const habitacion = new Habitacion_1.Habitacion("1", "Habitacion Deluxe", "Habitacion con vista al mar", 150, 10, Habitacion_1.categoriaHabitacion.Suite, [Servicios_1.Servicios.WIFI, Servicios_1.Servicios.BUFFET], ["image1.jpg", "image2.jpg"], "2", "D123");
        const dto = {
            id: "1",
            responsable: admin,
            tipo: NotasInternas_1.tiposNotasInternas.Habitacion,
            fecha: new Date(),
            titulo: "Reparacion de aire acondicionado",
            descripcion: "El aire acondicionado de la habitacion 101 no funciona correctamente",
            datosAgregados: [],
            habitacion: habitacion,
        };
        const nota = NotasInternas_1.NotasInternas.crearDesdeDTO(dto);
        expect(nota.id).toBe(dto.id);
        expect(nota.responsable).toBe(dto.responsable);
        expect(nota.tipo).toBe(dto.tipo);
        expect(nota.fecha).toBe(dto.fecha);
        expect(nota.titulo).toBe(dto.titulo);
        expect(nota.descripcion).toBe(dto.descripcion);
        expect(nota.datosAgregados).toEqual(dto.datosAgregados);
        expect(nota.habitacion).toBe(dto.habitacion);
    });
    it("modificar desde DTO (DESCRIPCION)", () => {
        const admin = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.ADMIN, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('ADM', 3, "admin")]);
        const habitacion = new Habitacion_1.Habitacion("1", "Habitacion Deluxe", "Habitacion con vista al mar", 150, 10, Habitacion_1.categoriaHabitacion.Suite, [Servicios_1.Servicios.WIFI, Servicios_1.Servicios.BUFFET], ["image1.jpg", "image2.jpg"], "2", "D123");
        const notaInterna = new NotasInternas_1.NotasInternas("1", admin, NotasInternas_1.tiposNotasInternas.Habitacion, new Date(), "Reparacion de aire acondicionado", "El aire acondicionado de la habitacion 101 no funciona correctamente", [], null, null, habitacion);
        const dto = {
            id: "1",
            responsable: admin,
            tipo: NotasInternas_1.tiposNotasInternas.Habitacion,
            fecha: new Date(),
            titulo: "Reparacion de aire acondicionado",
            descripcion: "El aire acondicionado de la habitacion 101 no funciona correctamente (MODFICADO)",
            datosAgregados: [],
            habitacion: habitacion,
        };
        notaInterna.modificarDesdeDTO(dto);
        expect(notaInterna.descripcion).toBe(dto.descripcion);
    });
});
