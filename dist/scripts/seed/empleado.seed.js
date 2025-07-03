"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedEmpleados = void 0;
const faker_1 = require("@faker-js/faker");
const EmpleadoModelo_1 = require("../../contexts/administrativo/infraestructura/models/EmpleadoModelo");
const seedEmpleados = async (count = 20) => {
    const empleados = [];
    for (let i = 0; i < count; i++) {
        empleados.push({
            email: faker_1.faker.internet.email(),
            photo: faker_1.faker.image.avatar(),
            startDate: faker_1.faker.date.past(),
            telefono: faker_1.faker.phone.number({ style: "international" }),
            codigo: `EMP-${faker_1.faker.string.alphanumeric(6).toUpperCase()}`,
            nombre: faker_1.faker.person.fullName(),
            password: faker_1.faker.internet.password({ length: 12 }),
            rol: faker_1.faker.helpers.arrayElement(['admin', 'staff']),
            permisosExtra: faker_1.faker.helpers.arrayElements([
                { codigo: 'ADM', nivel: 3, descripcion: 'testing' },
            ]),
            status: faker_1.faker.helpers.arrayElement(['activo', 'inactivo', 'suspendido'])
        });
    }
    await EmpleadoModelo_1.MEmpleado.deleteMany({});
    await EmpleadoModelo_1.MEmpleado.insertMany(empleados);
    console.log(`${empleados.length} empleados creados correctamente`);
};
exports.seedEmpleados = seedEmpleados;
