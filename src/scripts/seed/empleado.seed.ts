import {faker} from "@faker-js/faker"
import { MEmpleado } from "../../contexts/administrativo/infraestructura/models/EmpleadoModelo"

export const seedEmpleados = async (count = 2) => {
    const empleados = []

    for(let i = 0; i < count; i++){
        empleados.push({
            email: faker.internet.email(),
            photo: faker.image.avatar(),
            startDate: faker.date.past(),
            telefono: faker.phone.number({ style: "international" }),
            codigo: `EMP-${faker.string.alphanumeric(6).toUpperCase()}`,
            nombre: faker.person.fullName(),
            password: faker.internet.password({ length: 12 }),
            rol: faker.helpers.arrayElement(['admin', 'staff']),
            permisosExtra: faker.helpers.arrayElements([
                { codigo: 'ADM', nivel: 3 },
            ]),
            status: faker.helpers.arrayElement(['activo', 'inactivo'])
        })
    }
    await MEmpleado.deleteMany({});
    await MEmpleado.insertMany(empleados)
    console.log(`${empleados.length} empleados creados correctamente`)
}