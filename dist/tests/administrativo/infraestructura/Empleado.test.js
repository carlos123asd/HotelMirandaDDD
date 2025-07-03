"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const EmpleadoModelo_1 = require("../../../contexts/administrativo/infraestructura/models/EmpleadoModelo");
describe("Infraestructura - Test de Integracion Empleado", () => {
    it("Debe crear un empleado y recuperarlo", async () => {
        const fakeEmpleado = {
            _id: faker_1.faker.string.uuid(),
            email: faker_1.faker.internet.email(),
            photo: faker_1.faker.image.avatar(),
            startDate: faker_1.faker.date.past(),
            telefono: faker_1.faker.phone.number(),
            codigo: faker_1.faker.string.alpha(10),
            nombre: faker_1.faker.person.fullName(),
            password: faker_1.faker.internet.password(),
            rol: "admin",
            permisosExtra: [],
            status: "activo"
        };
        const empleado = new EmpleadoModelo_1.MEmpleado(fakeEmpleado);
        await empleado.save();
        const found = await EmpleadoModelo_1.MEmpleado.findById(empleado._id);
        expect(found).not.toBeNull();
        expect(found?.nombre).toBe(fakeEmpleado.nombre);
        expect(found?.email).toBe(fakeEmpleado.email);
    });
    it("Debe actualizar un empleado", async () => {
        const fakeEmpleado = {
            _id: faker_1.faker.string.uuid(),
            email: faker_1.faker.internet.email(),
            photo: faker_1.faker.image.avatar(),
            startDate: faker_1.faker.date.past(),
            telefono: faker_1.faker.phone.number(),
            codigo: faker_1.faker.string.alpha(10),
            nombre: faker_1.faker.person.fullName(),
            password: faker_1.faker.internet.password(),
            rol: "admin",
            permisosExtra: [],
            status: "activo"
        };
        const empleado = new EmpleadoModelo_1.MEmpleado(fakeEmpleado);
        await empleado.save();
        empleado.nombre = "Nombre Actualizado";
        await empleado.save();
        const found = await EmpleadoModelo_1.MEmpleado.findById(empleado._id);
        expect(found).not.toBeNull();
        expect(found?.nombre).toBe("Nombre Actualizado");
    });
    it("Debe eliminar un empleado", async () => {
        const fakeEmpleado = {
            _id: faker_1.faker.string.uuid(),
            email: faker_1.faker.internet.email(),
            photo: faker_1.faker.image.avatar(),
            startDate: faker_1.faker.date.past(),
            telefono: faker_1.faker.phone.number(),
            codigo: faker_1.faker.string.alpha(10),
            nombre: faker_1.faker.person.fullName(),
            password: faker_1.faker.internet.password(),
            rol: "admin",
            permisosExtra: [],
            status: "activo"
        };
        const empleado = new EmpleadoModelo_1.MEmpleado(fakeEmpleado);
        await empleado.save();
        await EmpleadoModelo_1.MEmpleado.deleteOne({ _id: empleado._id });
        const found = await EmpleadoModelo_1.MEmpleado.findById(empleado._id);
        expect(found).toBeNull();
    });
});
