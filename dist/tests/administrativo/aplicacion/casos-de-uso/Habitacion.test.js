"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Habitacion_1 = require("../../../../contexts/administrativo/dominio/agregados/Habitacion");
const Servicios_1 = require("../../../../contexts/administrativo/dominio/value-objects/Servicios");
describe("casos de uso Habitacion", () => {
    const repoHabitacion = {
        guardar: jest.fn(),
        eliminar: jest.fn(),
        buscarPorId: jest.fn().mockResolvedValue(new Habitacion_1.Habitacion("1", "Habitacion Deluxe", "Habitacion con vista al mar", 150, 10, Habitacion_1.categoriaHabitacion.Suite, [Servicios_1.Servicios.WIFI, Servicios_1.Servicios.BUFFET], ["image1.jpg", "image2.jpg"], "2", "D123")),
        buscarPorCodigo: jest.fn().mockResolvedValue(new Habitacion_1.Habitacion("1", "Habitacion Deluxe", "Habitacion con vista al mar", 150, 10, Habitacion_1.categoriaHabitacion.Suite, [Servicios_1.Servicios.WIFI, Servicios_1.Servicios.BUFFET], ["image1.jpg", "image2.jpg"], "2", "D123")),
        todasLasHabitaciones: jest.fn().mockResolvedValue([
            new Habitacion_1.Habitacion("1", "Habitacion Deluxe", "Habitacion con vista al mar", 150, 10, Habitacion_1.categoriaHabitacion.Suite, [Servicios_1.Servicios.WIFI, Servicios_1.Servicios.BUFFET], ["image1.jpg", "image2.jpg"], "2", "D123"),
            new Habitacion_1.Habitacion("2", "Habitacion Deluxe", "Habitacion con vista al mar", 150, 10, Habitacion_1.categoriaHabitacion["Doble Habitacion"], [Servicios_1.Servicios.WIFI, Servicios_1.Servicios.BUFFET], ["image1.jpg", "image2.jpg"], "2", "D122")
        ]),
        ContarHabitaciones: jest.fn().mockResolvedValue(2),
        buscarConFiltros: jest.fn().mockResolvedValue([
            new Habitacion_1.Habitacion("1", "Habitacion Deluxe", "Habitacion con vista al mar", 150, 10, Habitacion_1.categoriaHabitacion.Suite, [Servicios_1.Servicios.WIFI, Servicios_1.Servicios.BUFFET], ["image1.jpg", "image2.jpg"], "2", "D123"),
            new Habitacion_1.Habitacion("2", "Habitacion Deluxe", "Habitacion con vista al mar", 150, 10, Habitacion_1.categoriaHabitacion.Suite, [Servicios_1.Servicios.WIFI, Servicios_1.Servicios.BUFFET], ["image1.jpg", "image2.jpg"], "2", "D122")
        ])
    };
    it("crear habitacion", async () => {
        const habitacion = new Habitacion_1.Habitacion("1", "Habitacion Deluxe", "Habitacion con vista al mar", 150, 10, Habitacion_1.categoriaHabitacion.Suite, [Servicios_1.Servicios.WIFI, Servicios_1.Servicios.BUFFET], ["image1.jpg", "image2.jpg"], "2", "D123");
        await repoHabitacion.guardar(habitacion, false);
        expect(repoHabitacion.guardar).toHaveBeenCalledWith(habitacion, false);
    });
    it("eliminar habitacion", async () => {
        const id = "1";
        await repoHabitacion.eliminar(id);
        expect(repoHabitacion.eliminar).toHaveBeenCalledWith(id);
    });
    it("buscar habitacion por id", async () => {
        const habitacion = await repoHabitacion.buscarPorId("1");
        expect(habitacion).not.toBeNull();
        expect(habitacion).toBeInstanceOf(Habitacion_1.Habitacion);
        expect(habitacion?.id).toBe("1");
    });
    it("buscar habitacion por codigo", async () => {
        const habitacion = await repoHabitacion.buscarPorCodigo("D123");
        expect(habitacion).not.toBeNull();
        expect(habitacion).toBeInstanceOf(Habitacion_1.Habitacion);
        expect(habitacion?.codigo).toBe("D123");
    });
    it("obtener todas las habitaciones", async () => {
        const habitaciones = await repoHabitacion.todasLasHabitaciones();
        expect(habitaciones).not.toBeNull();
        expect(habitaciones?.length).toBeGreaterThan(0);
        expect(typeof (habitaciones?.values())).toBe("object");
        expect(habitaciones?.[0]).toBeInstanceOf(Habitacion_1.Habitacion);
    });
    it("contar habitaciones", async () => {
        const total = await repoHabitacion.ContarHabitaciones();
        expect(total).toBe(2);
    });
    it("buscar habitaciones con filtros ", async () => {
        const habitaciones = await repoHabitacion.buscarConFiltros({
            categorias: [Habitacion_1.categoriaHabitacion.Suite]
        });
        const todasTienenCategoriaSuite = habitaciones?.every(h => h.categoria === Habitacion_1.categoriaHabitacion.Suite);
        expect(todasTienenCategoriaSuite).toBe(true);
        expect(habitaciones).not.toBeNull();
        expect(habitaciones?.length).toBeGreaterThan(0);
        expect(typeof (habitaciones?.values())).toBe("object");
        expect(habitaciones?.[0]).toBeInstanceOf(Habitacion_1.Habitacion);
    });
});
