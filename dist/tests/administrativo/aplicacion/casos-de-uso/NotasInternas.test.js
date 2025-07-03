"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Empleado_1 = require("../../../../contexts/administrativo/dominio/agregados/Empleado");
const Habitacion_1 = require("../../../../contexts/administrativo/dominio/agregados/Habitacion");
const NotasInternas_1 = require("../../../../contexts/administrativo/dominio/agregados/NotasInternas");
const Permiso_1 = require("../../../../contexts/administrativo/dominio/value-objects/Permiso");
const Rol_1 = require("../../../../contexts/administrativo/dominio/value-objects/Rol");
const Servicios_1 = require("../../../../contexts/administrativo/dominio/value-objects/Servicios");
describe("casos de uso - Notas Internas", () => {
    const admin = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.ADMIN, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('ADM', 3, "admin")]);
    const habitacion = new Habitacion_1.Habitacion("1", "Habitacion Deluxe", "Habitacion con vista al mar", 150, 10, Habitacion_1.categoriaHabitacion.Suite, [Servicios_1.Servicios.WIFI, Servicios_1.Servicios.BUFFET], ["image1.jpg", "image2.jpg"], "2", "D123");
    const notaInterna = new NotasInternas_1.NotasInternas("1", admin, NotasInternas_1.tiposNotasInternas.Habitacion, new Date(), "Reparacion de aire acondicionado", "El aire acondicionado de la habitacion 101 no funciona correctamente", [], null, null, habitacion);
    const notasInternasRepo = {
        guardar: jest.fn(),
        eliminar: jest.fn(),
        buscarId: jest.fn().mockReturnValue(notaInterna),
        buscarPorHabitacion: jest.fn().mockReturnValue([notaInterna]),
        buscarPorCliente: jest.fn().mockReturnValue([notaInterna]),
        buscarPorReserva: jest.fn().mockReturnValue([notaInterna]),
        buscarTodasLasNotas: jest.fn().mockReturnValue([notaInterna])
    };
    it("crear nota interna", async () => {
        await notasInternasRepo.guardar(notaInterna, false);
        expect(notasInternasRepo.guardar).toHaveBeenCalledWith(notaInterna, false);
    });
    it("eliminar nota interna", async () => {
        const id = "1";
        await notasInternasRepo.eliminar(id);
        expect(notasInternasRepo.eliminar).toHaveBeenCalledWith(id);
    });
    it("buscar habitacion por id", async () => {
        const habitacion = await notasInternasRepo.buscarId("1");
        expect(habitacion).not.toBeNull();
        expect(habitacion).toBeInstanceOf(NotasInternas_1.NotasInternas);
        expect(habitacion?.id).toBe("1");
    });
    it("buscar notas internas por habitacion", async () => {
        const notas = await notasInternasRepo.buscarPorHabitacion("1");
        expect(notas).not.toBeNull();
        expect(notas).toBeInstanceOf(Array);
        expect(notas?.length).toBeGreaterThan(0);
        expect(notas?.[0]).toBeInstanceOf(NotasInternas_1.NotasInternas);
        expect(notas?.[0].habitacion?.id).toBe("1");
    });
});
