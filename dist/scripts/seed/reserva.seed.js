"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedReservas = void 0;
const faker_1 = require("@faker-js/faker");
const Reserva_1 = require("../../contexts/administrativo/infraestructura/models/Reserva");
const seedReservas = async (count = 20) => {
    const reservas = [];
    for (let i = 0; i < count; i++) {
        const checkIn = faker_1.faker.date.future();
        const checkOut = faker_1.faker.date.soon({ days: faker_1.faker.number.int({ min: 1, max: 10 }), refDate: checkIn });
        reservas.push({
            _id: faker_1.faker.database.mongodbObjectId(),
            estado: faker_1.faker.helpers.arrayElement(['pendiente', 'aceptada', 'en curso', 'cancelada']),
            idCliente: "ddb6bbed3dc74ccefccae88c",
            idHabitacion: "cf038bd1aac8cac11a0dd9ca",
            checkIn,
            checkOut,
            totalReserva: faker_1.faker.number.float({ min: 100, max: 5000 }),
            idEmpleado: null,
            extras: null,
            idNotasInternas: null,
            peticion: null
        });
    }
    await Reserva_1.MReserva.deleteMany({});
    await Reserva_1.MReserva.insertMany(reservas);
    console.log(`${reservas.length} reservas creadas correctamente`);
};
exports.seedReservas = seedReservas;
