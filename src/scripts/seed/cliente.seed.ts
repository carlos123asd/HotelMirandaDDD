import { faker } from '@faker-js/faker';
import { ICliente } from '../../contexts/cliente/infraestructura/interfaces/ICliente';
import { ClienteModelo } from '../../contexts/cliente/infraestructura/models/ClienteModelo';

export const seedCliente = async (count = 5) => {
  const clientes: ICliente[] = [];

  for (let i = 0; i < count; i++) {
    clientes.push({
      _id: faker.database.mongodbObjectId(),
      nombre: faker.person.fullName(),
      email: faker.internet.email(),
      direccion: faker.location.streetAddress(),
      password: faker.internet.password({ length: 12 }),
      metodoPago: faker.helpers.arrayElement(['Tarjeta', 'Metalico']),
    });
  }

  await ClienteModelo.deleteMany({});
  await ClienteModelo.insertMany(clientes);
  console.log(`${clientes.length} clientes creados correctamente`);
};
