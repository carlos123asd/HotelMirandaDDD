"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedHabitacion = void 0;
const faker_1 = require("@faker-js/faker");
const HabitacionModelo_1 = require("../../contexts/administrativo/infraestructura/models/HabitacionModelo");
const seedHabitacion = async (count = 10) => {
    const habitaciones = [];
    for (let i = 0; i < count; i++) {
        habitaciones.push({
            _id: faker_1.faker.database.mongodbObjectId(),
            nombre: `Habitación ${faker_1.faker.number.int({ min: 100, max: 999 })}`,
            descripcion: faker_1.faker.lorem.sentences(2),
            precio: faker_1.faker.number.float({ min: 50, max: 500 }),
            oferta: faker_1.faker.number.float({ min: 0, max: 50 }),
            categoria: faker_1.faker.helpers.arrayElement(['Suite', 'Deluxe', 'Familiar', 'Presidencial']),
            servicios: faker_1.faker.helpers.arrayElements(['WIFI', 'TV', 'tour', 'transporte', 'lavanderia', 'gimnasio'], { min: 2, max: 5 }),
            imagenes: Array.from({ length: faker_1.faker.number.int({ min: 2, max: 4 }) }, () => faker_1.faker.image.urlPicsumPhotos()),
            piso: `${faker_1.faker.number.int({ min: 1, max: 10 })}`,
            codigo: `HAB-${faker_1.faker.string.alphanumeric(6).toUpperCase()}`,
        });
    }
    await HabitacionModelo_1.MHabitacion.deleteMany({});
    await HabitacionModelo_1.MHabitacion.insertMany(habitaciones);
    console.log(`${habitaciones.length} habitaciones creadas correctamente`);
};
exports.seedHabitacion = seedHabitacion;
