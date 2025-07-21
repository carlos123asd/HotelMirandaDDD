import { faker } from '@faker-js/faker';
import { IReserva } from '../../contexts/administrativo/infraestructura/interfaces/IReserva';
import { MReserva } from '../../contexts/administrativo/infraestructura/models/Reserva';

export const seedReservas = async (count = 20) => {
  const reservas: IReserva[] = [];

  for (let i = 0; i < count; i++) {
    const checkIn = faker.date.future();
    const checkOut = faker.date.soon({ days: faker.number.int({ min: 1, max: 10 }), refDate: checkIn });

    reservas.push({
      _id: faker.database.mongodbObjectId(),
      estado: faker.helpers.arrayElement(['pendiente', 'aceptada', 'en curso', 'cancelada']),
      idCliente: faker.helpers.arrayElement(['ac3538cece9af4fbe8d8e6ce', '5ac2855e42514e8725bc7acf', '97bb041cf9ce247e1ea68ada', 'ddb6bbed3dc74ccefccae88c']),
      idHabitacion: faker.helpers.arrayElement(['547bbd55b11dbc1abe742d2f', 'bd5e3d1a1ca5bfd34a6ddfd8', 'cacceafde1578e28b8ccaf0d', 'a33ac5e1ffb39a34acaf5caf']),
      checkIn,
      checkOut,
      totalReserva: faker.number.float({ min: 100, max: 5000 }),
      idEmpleado: null,
      extras: null,
      idNotasInternas: null,
      peticion: null
    });
  }

  await MReserva.deleteMany({});
  await MReserva.insertMany(reservas);
  console.log(`${reservas.length} reservas creadas correctamente`);
};
