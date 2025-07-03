"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedNotas = void 0;
const faker_1 = require("@faker-js/faker");
const NotasInternas_1 = require("../../contexts/administrativo/infraestructura/models/NotasInternas");
const seedNotas = async (count = 10) => {
    const notas = [];
    for (let i = 0; i < count; i++) {
        const tipo = faker_1.faker.helpers.arrayElement(['Habitacion', 'Cliente', 'Reserva']);
        notas.push({
            _id: faker_1.faker.database.mongodbObjectId(),
            idResponsable: "6862c745c5478b8b9372ba36",
            tipo: tipo,
            fecha: faker_1.faker.date.between({
                from: faker_1.faker.date.past({ years: 1 }),
                to: new Date(),
            }),
            titulo: faker_1.faker.lorem.sentence({ min: 3, max: 8 }),
            descripcion: faker_1.faker.lorem.paragraphs({ min: 1, max: 2 }),
            datosAgregados: null,
            idCliente: tipo === 'Cliente' ? "ac3538cece9af4fbe8d8e6ce" : null,
            idReserva: tipo === 'Reserva' ? "f4e10cffaa2b6b55170df739" : null,
            idHabitacion: tipo === 'Habitacion' ? "cf038bd1aac8cac11a0dd9ca" : null
        });
    }
    await NotasInternas_1.MNotasInternas.deleteMany({});
    await NotasInternas_1.MNotasInternas.insertMany(notas);
    console.log(`${notas.length} notas creadas correctamente`);
};
exports.seedNotas = seedNotas;
