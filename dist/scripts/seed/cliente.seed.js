"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCliente = void 0;
const faker_1 = require("@faker-js/faker");
const ClienteModelo_1 = require("../../contexts/cliente/infraestructura/models/ClienteModelo");
const seedCliente = async (count = 5) => {
    const clientes = [];
    for (let i = 0; i < count; i++) {
        clientes.push({
            _id: faker_1.faker.database.mongodbObjectId(),
            nombre: faker_1.faker.person.fullName(),
            email: faker_1.faker.internet.email(),
            direccion: faker_1.faker.location.streetAddress(),
            password: faker_1.faker.internet.password({ length: 12 }),
            metodoPago: faker_1.faker.helpers.arrayElement(['Tarjeta', 'Metalico']),
        });
    }
    await ClienteModelo_1.ClienteModelo.deleteMany({});
    await ClienteModelo_1.ClienteModelo.insertMany(clientes);
    console.log(`${clientes.length} clientes creados correctamente`);
};
exports.seedCliente = seedCliente;
