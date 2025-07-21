import { faker } from '@faker-js/faker';
import IHabitacion from '../../contexts/administrativo/infraestructura/interfaces/IHabitacion';
import { MHabitacion } from '../../contexts/administrativo/infraestructura/models/HabitacionModelo';

export const seedHabitacion = async (count = 10) => {
  const habitaciones: IHabitacion[] = [];

  for (let i = 0; i < count; i++) {
    habitaciones.push({
      _id: faker.database.mongodbObjectId(),
      nombre: `Habitación ${faker.number.int({ min: 100, max: 999 })}`,
      descripcion: faker.lorem.sentences(2),
      precio: faker.number.float({ min: 50, max: 500}),
      oferta: faker.number.float({ min: 0, max: 50}),
      categoria: faker.helpers.arrayElement(['Suite', 'Deluxe', 'Familiar', 'Presidencial']),
      servicios: ["9cc3bb5699fcbd15e5b55a8d","f7ce1bd873bf44e4af4f3fdd"],
      imagenes: Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () =>
        faker.image.urlPicsumPhotos()
      ),
      piso: `${faker.number.int({ min: 1, max: 10 })}`,
      codigo: `HAB-${faker.string.alphanumeric(6).toUpperCase()}`,
    });
  }

  await MHabitacion.deleteMany({});
  await MHabitacion.insertMany(habitaciones);
  console.log(`${habitaciones.length} habitaciones creadas correctamente`);
};
