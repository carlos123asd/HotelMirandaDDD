"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const ClienteModelo_1 = require("../../../contexts/cliente/infraestructura/models/ClienteModelo");
describe("Infraestructura - Test de Integracion Cliente", () => {
    it("Debe crear un cliente y recuperarlo", async () => {
        const fakeCliente = {
            _id: faker_1.faker.string.uuid(),
            nombre: faker_1.faker.person.fullName(),
            email: faker_1.faker.internet.email(),
            direccion: faker_1.faker.location.streetAddress(),
            password: faker_1.faker.internet.password(),
            metodoPago: "Tarjeta"
        };
        const cliente = new ClienteModelo_1.ClienteModelo(fakeCliente);
        await cliente.save();
        const found = await ClienteModelo_1.ClienteModelo.findById(cliente._id);
        expect(found).not.toBeNull();
        expect(found?._id).toBe(fakeCliente._id);
    });
    it("Debe actualizar un cliente", async () => {
        const fakeCliente = {
            _id: faker_1.faker.string.uuid(),
            nombre: faker_1.faker.person.fullName(),
            email: faker_1.faker.internet.email(),
            direccion: faker_1.faker.location.streetAddress(),
            password: faker_1.faker.internet.password(),
            metodoPago: "Tarjeta"
        };
        const cliente = new ClienteModelo_1.ClienteModelo(fakeCliente);
        await cliente.save();
        cliente.nombre = "Nombre Actualizado";
        await cliente.save();
        const found = await ClienteModelo_1.ClienteModelo.findById(cliente._id);
        expect(found).not.toBeNull();
        expect(found?.nombre).toBe("Nombre Actualizado");
    });
    it("Debe eliminar un cliente", async () => {
        const fakeCliente = {
            _id: faker_1.faker.string.uuid(),
            nombre: faker_1.faker.person.fullName(),
            email: faker_1.faker.internet.email(),
            direccion: faker_1.faker.location.streetAddress(),
            password: faker_1.faker.internet.password(),
            metodoPago: "Tarjeta"
        };
        const cliente = new ClienteModelo_1.ClienteModelo(fakeCliente);
        await cliente.save();
        await ClienteModelo_1.ClienteModelo.deleteOne({ _id: cliente._id });
        const found = await ClienteModelo_1.ClienteModelo.findById(cliente._id);
        expect(found).toBeNull();
    });
});
