"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const HabitacionModelo_1 = require("../../../contexts/administrativo/infraestructura/models/HabitacionModelo");
describe("Infraestructura - Test de Integracion Habitacion", () => {
    it("Debe crear una habitacion y recuperarla", async () => {
        const fakeHabitacion = {
            _id: faker_1.faker.string.uuid(),
            nombre: faker_1.faker.person.fullName(),
            descripcion: faker_1.faker.lorem.paragraph(),
            precio: faker_1.faker.number.float({ min: 50, max: 500 }),
            oferta: faker_1.faker.number.float({ min: 0, max: 100 }),
            categoria: faker_1.faker.commerce.department(),
            servicios: [faker_1.faker.commerce.productAdjective(), faker_1.faker.commerce.productAdjective()],
            imagenes: [faker_1.faker.image.url(), faker_1.faker.image.url()],
            piso: faker_1.faker.string.alpha(1),
            codigo: faker_1.faker.string.alpha(10)
        };
        const habitacion = new HabitacionModelo_1.MHabitacion(fakeHabitacion);
        await habitacion.save();
        const found = await HabitacionModelo_1.MHabitacion.findById(habitacion._id);
        expect(found).not.toBeNull();
        expect(found?.codigo).toBe(fakeHabitacion.codigo);
    });
    it("Debe actualizar una habitacion", async () => {
        const fakeHabitacion = {
            _id: faker_1.faker.string.uuid(),
            nombre: faker_1.faker.person.fullName(),
            descripcion: faker_1.faker.lorem.paragraph(),
            precio: faker_1.faker.number.float({ min: 50, max: 500 }),
            oferta: faker_1.faker.number.float({ min: 0, max: 100 }),
            categoria: faker_1.faker.commerce.department(),
            servicios: [faker_1.faker.commerce.productAdjective(), faker_1.faker.commerce.productAdjective()],
            imagenes: [faker_1.faker.image.url(), faker_1.faker.image.url()],
            piso: faker_1.faker.string.alpha(1),
            codigo: faker_1.faker.string.alpha(10)
        };
        const habitacion = new HabitacionModelo_1.MHabitacion(fakeHabitacion);
        await habitacion.save();
        habitacion.nombre = "Nombre Actualizado";
        await habitacion.save();
        const found = await HabitacionModelo_1.MHabitacion.findById(habitacion._id);
        expect(found).not.toBeNull();
        expect(found?.nombre).toBe("Nombre Actualizado");
    });
    it("Debe eliminar una habitacion", async () => {
        const fakeHabitacion = {
            _id: faker_1.faker.string.uuid(),
            nombre: faker_1.faker.person.fullName(),
            descripcion: faker_1.faker.lorem.paragraph(),
            precio: faker_1.faker.number.float({ min: 50, max: 500 }),
            oferta: faker_1.faker.number.float({ min: 0, max: 100 }),
            categoria: faker_1.faker.commerce.department(),
            servicios: [faker_1.faker.commerce.productAdjective(), faker_1.faker.commerce.productAdjective()],
            imagenes: [faker_1.faker.image.url(), faker_1.faker.image.url()],
            piso: faker_1.faker.string.alpha(1),
            codigo: faker_1.faker.string.alpha(10)
        };
        const habitacion = new HabitacionModelo_1.MHabitacion(fakeHabitacion);
        await habitacion.save();
        await HabitacionModelo_1.MHabitacion.deleteOne({ _id: habitacion._id });
        const found = await HabitacionModelo_1.MHabitacion.findById(habitacion._id);
        expect(found).toBeNull();
    });
});
