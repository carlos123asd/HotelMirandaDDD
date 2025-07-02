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
      idCliente: "ddb6bbed3dc74ccefccae88c",
      idHabitacion: "cf038bd1aac8cac11a0dd9ca",
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
